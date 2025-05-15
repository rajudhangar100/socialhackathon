const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const consultSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    photos: [{
        type: String // Will store Cloudinary URLs
    }]
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

consultSchema.plugin(toJSON);
consultSchema.plugin(paginate);

module.exports = mongoose.model('Consult', consultSchema);
