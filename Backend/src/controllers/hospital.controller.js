const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Doctor, User, Consult } = require('../models');
const { Types: { ObjectId } } = require('mongoose');
const { isValidObjectId } = require('mongoose');
const mongoose = require('mongoose');
// Adjust the path as needed

/**
 * Get all doctors related to a specific hospital
 */
const getDoctorsByHospital = catchAsync(async (req, res) => {
    const { id } = req.params;

    // Validate id format
    if (!isValidObjectId(id)) {
        return res.status(400).send({ message: 'Invalid hospital ID' });
    }
    // Convert to ObjectId
    const hospitalObjectId = new mongoose.Types.ObjectId(id);

    // Query doctors
    const doctors = await Doctor.find({ hospital: hospitalObjectId })
        .populate('details');

    if (doctors.length==0) {
        return res.status(404).send({ message: 'No doctors found' });
    }

    res.status(200).send({ doctors });
});

const getAllHospitals = catchAsync(async (req, res) => {
    // Find users with role 'hospital'
    const hospitals = await User.find({ role: 'hospital' });

    if (!hospitals || hospitals.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No hospitals found' });
    }

    res.status(httpStatus.OK).send(hospitals);
});

/**
 * Get all patients related to a specific hospital
 */
const getPatientsByHospital = catchAsync(async (req, res) => {
    const { id } = req.params; // Extract hospital ID from request parameters

    // Find all doctors associated with the hospital
    const doctors = await Doctor.find({ hospital: id }).select('_id');

    if (!doctors || doctors.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No doctors found for this hospital' });
    }

    // Extract doctor IDs
    const doctorIds = doctors.map((doctor) => doctor._id);

    // Find all consults associated with these doctors
    const consults = await Consult.find({ doctor: { $in: doctorIds } }).select('patient');

    if (!consults || consults.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No patients found for this hospital' });
    }

    // Extract patient IDs from consults
    const patientIds = consults.map((consult) => consult.patient);

    // Find all patients using their IDs and role='patient'
    const patients = await User.find({ _id: { $in: patientIds }, role: 'patient' });

    if (!patients || patients.length === 0) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'No patients found for this hospital' });
    }

    res.status(httpStatus.OK).send(patients);
});

module.exports = {
    getDoctorsByHospital,
    getAllHospitals,
    getPatientsByHospital,
};
