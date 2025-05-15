const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Consult, User, Doctor } = require('../models');

// Helper function to get doctor ID from user ID
const getDoctorId = async (userId) => {
    const doctor = await Doctor.findOne({ details: userId });
    return doctor?._id;
};

const createConsult = catchAsync(async (req, res) => {
    const photoUrls = req.files?.map(file => file.path) || [];
    let consultBody;

    if (req.user.role === 'patient') {
        consultBody = {
            ...req.body,
            doctor: req.params.doctorId,
            patient: req.user.id,
            photos: photoUrls
        };

        // Verify doctor exists
        const doctorExists = await Doctor.exists({ _id: consultBody.doctor });
        if (!doctorExists) {
            return res.status(httpStatus.NOT_FOUND).send({ message: 'Doctor not found' });
        }
    } else if (req.user.role === 'doctor') {
        const doctorId = await getDoctorId(req.user.id);
        if (!doctorId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Doctor profile not complete' });
        }

        consultBody = {
            ...req.body,
            doctor: doctorId,
            patient: req.body.patientId,
            photos: photoUrls
        };

        // Verify patient exists
        const patientExists = await User.exists({
            _id: consultBody.patient,
            role: 'patient'
        });
        if (!patientExists) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid patient' });
        }
    }

    const consult = await Consult.create(consultBody);
    res.status(httpStatus.CREATED).send(await consult.populate('doctor patient'));
});

const getAllConsults = catchAsync(async (req, res) => {
    let query;

    if (req.user.role === 'patient') {
        // For patients, fetch all consultations associated with their user ID
        query = { patient: req.user.id };
    } else if (req.user.role === 'doctor') {
        // For doctors, fetch only pending consultations associated with their doctor ID
        const doctorId = await getDoctorId(req.user.id);
        if (!doctorId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Doctor profile not complete' });
        }
        query = { doctor: doctorId, status: 'pending' }; // Add filter for status: 'pending'
    } else {
        return res.status(httpStatus.FORBIDDEN).send({ message: 'Unauthorized access' });
    }

    // Fetch consultations based on the query
    const consults = await Consult.find(query)
        .populate({
            path: 'doctor',
            populate: {
                path: 'details', // Populate the details field in the Doctor model
                select: 'name email', // Select specific fields from User model (e.g., name and email)
            },
        })
        .populate('patient') // Populate patient details
        .sort('-createdAt'); // Sort by most recently created first

    res.status(httpStatus.OK).send(consults);
});

const getConsultById = catchAsync(async (req, res) => {
    let doctorId;
    if (req.user.role === 'doctor') {
        doctorId = await getDoctorId(req.user.id);
        if (!doctorId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Doctor profile not complete' });
        }
    }

    const consult = await Consult.findOne({
        _id: req.params.consultId,
        $or: [
            { patient: req.user.id },
            { doctor: doctorId || req.user.id } // Use doctorId if available
        ]
    }).populate('doctor patient');

    if (!consult) {
        return res.status(httpStatus.NOT_FOUND).send({
            message: 'Consultation not found or unauthorized'
        });
    }

    res.status(httpStatus.OK).send(consult);
});

const updateConsult = catchAsync(async (req, res) => {
    const updatedFields = { ...req.body };
    if (req.files?.length) {
        updatedFields.photos = req.files.map(file => file.path);
    }

    let doctorId;
    if (req.user.role === 'doctor') {
        doctorId = await getDoctorId(req.user.id);
        if (!doctorId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Doctor profile not complete' });
        }
    }

    const consult = await Consult.findOneAndUpdate(
        {
            _id: req.params.consultId,
            $or: [
                { patient: req.user.id },
                { doctor: doctorId || req.user.id }
            ]
        },
        updatedFields,
        { new: true, runValidators: true }
    ).populate('doctor patient');

    if (!consult) {
        return res.status(httpStatus.NOT_FOUND).send({
            message: 'Consultation not found or unauthorized'
        });
    }

    res.status(httpStatus.OK).send(consult);
});

const deleteConsult = catchAsync(async (req, res) => {
    let doctorId;
    if (req.user.role === 'doctor') {
        doctorId = await getDoctorId(req.user.id);
        if (!doctorId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'Doctor profile not complete' });
        }
    }

    const consult = await Consult.findOneAndDelete({
        _id: req.params.consultId,
        $or: [
            { patient: req.user.id },
            { doctor: doctorId || req.user.id }
        ]
    });

    if (!consult) {
        return res.status(httpStatus.NOT_FOUND).send({
            message: 'Consultation not found or unauthorized'
        });
    }

    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createConsult,
    getAllConsults,
    getConsultById,
    updateConsult,
    deleteConsult,
};
