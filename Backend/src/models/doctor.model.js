const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const specializations = require('../config/doctors');

const doctorSchema = mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        enum: specializations,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


doctorSchema.plugin(toJSON);
doctorSchema.plugin(paginate);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;