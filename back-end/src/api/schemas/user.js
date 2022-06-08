const Joi = require('joi');

const getAllByRole = Joi.object({
    role: Joi.string().required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

const create = Joi.object({
    name: Joi.string().required().min(12),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

module.exports = { getAllByRole, login, create };