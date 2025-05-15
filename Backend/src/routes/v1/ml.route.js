// routes/mlRoutes.js
const express = require('express');
const { mlController } = require('../../controllers');
const upload = require('../../middlewares/upload'); // Middleware for file uploads

const router = express.Router();

// Route to handle image upload and ML processing
router.post(
    '/upload-ml',
    upload.array('photos', 5), // Middleware to handle file uploads (max 5 files)
    mlController.uploadMLPhotos // Controller to handle the upload and ML processing
);

module.exports = router;
