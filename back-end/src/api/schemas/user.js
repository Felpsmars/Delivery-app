const Joi = require('joi');

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

module.exports = { login };