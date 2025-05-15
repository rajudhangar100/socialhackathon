const Joi = require('joi');

// Validation for creating a new consultation
const createConsult = {
    params: Joi.object().keys({
        doctorId: Joi.string().required().length(24),
    }),
    body: Joi.object().keys({
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'completed', 'cancelled').default('pending'),
    }),
};

// Validation for updating a consultation
const updateConsult = {
    body: Joi.object()
        .keys({
            description: Joi.string(),
            date: Joi.date(),
            time: Joi.string(),
            status: Joi.string().valid('pending', 'completed', 'cancelled'),
        })
        .min(1),
};

const consultIdValidation = {
    params: Joi.object().keys({
        consultId: Joi.string().required().length(24),
    }),
};

module.exports = {
    createConsult,
    updateConsult,
    consultIdValidation,
};
