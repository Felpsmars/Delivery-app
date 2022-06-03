const { Router } = require('express');

const productController = require('../controllers/product');
const authMiddleware = require('../middlewares/auth');

const productRouter = Router();

productRouter.route('/products')
    .get(
        authMiddleware.validateToken,
        productController.getAll,
    );

productRouter.route('/products/:id')
    .get(
        authMiddleware.validateToken,
        productController.getById,
    );

module.exports = productRouter;
