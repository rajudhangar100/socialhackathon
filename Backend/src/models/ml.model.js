const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const MLSchema = mongoose.Schema({
    consult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consult',
        required: true,
    },
    photos: [{
        type: String // Will store Cloudinary URLs
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ML', MLSchema);