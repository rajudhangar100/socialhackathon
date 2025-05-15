const axios = require('axios');
const { cloudinary } = require('../config/cloudinary');
const { ML } = require('../models');

const uploadMLPhotos = async (req, res) => {
    try {
        // Step 1: Validate inputs
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        if (!req.body.consultId) {
            return res.status(400).json({ success: false, message: 'Consult ID is required' });
        }

        // Step 2: Upload files to Cloudinary
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path, { folder: 'ml-uploads' })
        );
        const uploadedImages = await Promise.all(uploadPromises);
        const photoUrls = uploadedImages.map(img => img.secure_url);

        // Step 3: Save to MongoDB
        const mlEntry = await ML.create({
            consult: req.body.consultId,
            photos: photoUrls
        });

        // Step 4: Send image URLs to Flask server (port 8080) for predictions
        const predictionRequests = photoUrls.map(async (url) => {
            try {
                const response = await axios.post('http://127.0.0.1:8080/predict', {
                    image_url: url
                }, {
                    timeout: 60000 // 10 seconds timeout to handle Flask server delay
                });

                return {
                    image_url: url,
                    success: true,
                    prediction: response.data
                };
            } catch (error) {
                console.error(`Prediction failed for ${url}:`, error.message);

                return {
                    image_url: url,
                    success: false,
                    error: error.response?.data || error.message
                };
            }
        });

        const mlResults = await Promise.all(predictionRequests);

        // Step 5: Respond with results
        res.status(201).json({
            success: true,
            cloudinaryUrls: photoUrls,
            mlResults,
            databaseEntry: mlEntry
        });

    } catch (error) {
        console.error('Upload ML Photo Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while processing ML upload',
            error: error.message
        });
    }
};

module.exports = {
    uploadMLPhotos
};
