const { Router } = require('express');

const saleController = require('../controllers/sale');
const saleMiddleware = require('../middlewares/sale');
const authMiddleware = require('../middlewares/auth');

const saleRouter = Router();

saleRouter.route('/sale')
    .post(
        authMiddleware.validateToken,
        saleMiddleware.validateCreate,
        saleController.create,
    );

saleRouter.route('/sale/:id')
    .get(
        authMiddleware.validateToken,
        saleController.getAll,
    )
    .patch(
        authMiddleware.validateToken,
        saleController.updateStatus,
    );

saleRouter.route('/sale/seller/:sellerId')
    .get(
        authMiddleware.validateToken,
        saleController.getBySeller,
    );

module.exports = saleRouter;
