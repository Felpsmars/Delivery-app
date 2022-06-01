const Joi = require('joi');

const login = Joi.object({
    username: Joi.string().required().min(6),
    password: Joi.string().required().min(6),
})

module.exports = { login };