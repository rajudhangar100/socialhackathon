const Joi = require('joi');
const { password } = require('./custom.validation');
const { roles } = require('../config/roles');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(), // Just validate if it's a valid email
    password: Joi.string().required().custom(password), // Password validation
    name: Joi.string().required(), // Name validation
    role: Joi.string().valid(...roles).default('patient'), // Role validation
    phone: Joi.string().required(), // Phone validation
    street: Joi.string().required(), // Address validation
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pinCode: Joi.string().required(),
    gender: Joi.string(),
    age: Joi.number(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
