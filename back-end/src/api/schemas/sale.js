const Joi = require('joi');

const create = Joi.object({
    userId: Joi.number().required(),
    sellerId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    products: Joi.array(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.number().required(),
});

module.exports = { create };