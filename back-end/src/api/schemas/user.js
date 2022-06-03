const Joi = require('joi');

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

const create = Joi.object({
    name: Joi.string().required().min(12),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

module.exports = { login, create };