const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { roles } = require('../config/roles'); // Ensure to import roles from the configuration

const createUser = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .external(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('Email is already taken');
        }
      }),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string()
      .valid(...roles) // Ensure the role is one of the predefined roles
      .default('patient'),
    phone: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pinCode: Joi.string().required(),
    gender: Joi.string(),
    age: Joi.number(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string().valid(...roles), // Ensure role is a valid role
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().external(async (value, helpers) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return helpers.message('Email is already taken');
        }
      }),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid(...roles),
      phone: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      pinCode: Joi.string(),
      gender: Joi.string(),
      age: Joi.number()
    })
    .min(1), // At least one field must be provided to update
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
