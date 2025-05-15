const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const prescriptionSchema = mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true, // Required field for the doctor who created the prescription
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Required field for the patient associated with the prescription
        },
        consultation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Consult',
            required: true, // Required field for linking to a consultation
        },
        description: {
            type: String,
            required: true, // Required field for prescription details
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Add plugins that convert mongoose documents to JSON and add pagination support
prescriptionSchema.plugin(toJSON);
prescriptionSchema.plugin(paginate);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
