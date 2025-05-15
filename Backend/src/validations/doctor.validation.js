const Joi = require('joi');
const { objectId } = require('./custom.validation');
const specializations = require('../config/doctors');

const createDoctor = {
    params: Joi.object().keys({
        hospitalId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        // User fields
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        phone: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pinCode: Joi.string().required(),
        gender:Joi.string().required(),
        age:Joi.number().required(),

        // Doctor fields
        specialization: Joi.string().required().valid(...specializations),
        experience: Joi.number().required(),
        education: Joi.string().required(),
        fees: Joi.number().required(),
    }),
};


const getDoctorById = {
    params: Joi.object().keys({
        doctorId: Joi.string().custom(objectId).required(),
    }),
};

const updateDoctor = {
    params: Joi.object().keys({
        doctorId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object()
        .keys({
            specialization: Joi.string().valid(...specializations),
            experience: Joi.number(),
            education: Joi.string(),
            fees: Joi.number(),
            details: Joi.string().custom(objectId),
        })
        .min(1),
};

const deleteDoctor = {
    params: Joi.object().keys({
        doctorId: Joi.string().custom(objectId).required(),
    }),
};

module.exports = {
    createDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
