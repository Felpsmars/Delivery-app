const { Router } = require('express');
const { getProduct, getById } = require('../controllers/products');

const userRouter = Router();

userRouter.route('/products')
    .get(
     getProduct,
    );

    userRouter.route('/products/:id')
    .get(
     getById,
    );

module.exports = userRouter;
