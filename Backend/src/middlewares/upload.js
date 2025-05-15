const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit to 5MB per file (optional)
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

module.exports = upload;
