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

saleRouter.route('/sale/:userId')
    .get(
        authMiddleware.validateToken,
        saleController.getAll,
    );

saleRouter.route('/delivered/:id')
    .patch(
        authMiddleware.validateToken,
        saleController.saleDelivered,
    );

module.exports = saleRouter;
