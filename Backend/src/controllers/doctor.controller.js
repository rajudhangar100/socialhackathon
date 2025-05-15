const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Doctor, User } = require('../models');

const createDoctor = catchAsync(async (req, res) => {
    const { hospitalId } = req.params; // Hospital ID from route params
    const userData = req.body; // User data and doctor data combined in the request body

    // Extract user fields and doctor fields from request body
    const {
        name,
        email,
        password,
        phone,
        street,
        city,
        state,
        country,
        pinCode,
        specialization,
        experience,
        education,
        fees,
    } = userData;

    // Create a new user (role: 'doctor')
    const user = await User.create({
        name,
        email,
        password,
        phone,
        street,
        city,
        state,
        country,
        pinCode,
        role: 'doctor', // Set role to 'doctor'
    });

    // Create a new doctor record with reference to the user and hospital
    const doctor = await Doctor.create({
        hospital: hospitalId, // Reference to hospital
        specialization,
        experience,
        education,
        fees,
        details: user._id, // Reference to created user
    });

    res.status(httpStatus.CREATED).send(doctor);
});



const getAllDoctors = catchAsync(async (req, res) => {
    const doctors = await Doctor.find().populate('hospital details');
    res.status(httpStatus.OK).send(doctors);
});

const getDoctorById = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId).populate('hospital details');
    if (!doctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    res.status(httpStatus.OK).send(doctor);
});

const updateDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true, runValidators: true });
    if (!updatedDoctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    res.status(httpStatus.OK).send(updatedDoctor);
});

const deleteDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
    }
    const user = await User.findByIdAndDelete(doctor.details);
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
    }
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
