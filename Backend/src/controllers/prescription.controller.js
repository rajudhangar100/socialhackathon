const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Prescription, Consult, Doctor } = require('../models');

// Create a new prescription (still requires consultation ID)
const createPrescription = catchAsync(async (req, res) => {
    const { consultationId } = req.params;

    // Find the consultation by its ID
    const consultation = await Consult.findById(consultationId);
    if (!consultation) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Consultation not found' });
    }

    const doctor = await Doctor.findOne({ details: req.user.id });
    const prescription = await Prescription.create({
        ...req.body,
        consultation: consultationId,
        doctor: doctor._id,
        patient: consultation.patient // Get patient from consultation
    });

    // Update the status of the consultation to "completed"
    consultation.status = 'completed';
    await consultation.save();

    // Send response
    res.status(httpStatus.CREATED).send(prescription);
});


// Get all prescriptions for a consultation
const getConsultationPrescriptions = catchAsync(async (req, res) => {
    const { consultationId } = req.params;
    const prescriptions = await Prescription.find({ consultation: consultationId })
        .populate('doctor patient consultation');
    res.send(prescriptions);
});

// Get a single prescription by ID (no consultation ID needed)
const getPrescription = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    const prescription = await Prescription.findById(prescriptionId)
        .populate('doctor patient consultation');

    if (!prescription) {
        return res.status(httpStatus.NOT_FOUND).send('Prescription not found');
    }
    res.send(prescription);
});

// Update a prescription by ID (no consultation ID needed)
const updatePrescription = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    const prescription = await Prescription.findOneAndUpdate(
        { _id: prescriptionId, doctor: req.user.id }, // Ensure doctor owns the prescription
        req.body,
        { new: true, runValidators: true }
    );
    res.send(prescription);
});

// Delete a prescription by ID (no consultation ID needed)
const deletePrescription = catchAsync(async (req, res) => {
    const { prescriptionId } = req.params;
    await Prescription.deleteOne({
        _id: prescriptionId,
        doctor: req.user.id // Ensure doctor owns the prescription
    });
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPrescription,
    getConsultationPrescriptions,
    getPrescription,
    updatePrescription,
    deletePrescription,
};
