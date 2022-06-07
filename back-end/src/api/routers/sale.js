const { Router } = require('express');

const saleController = require('../controllers/sale');
const saleMiddleware = require('../middlewares/sale');

const saleRouter = Router();

saleRouter.route('/sale')
    .post(
        saleMiddleware.validateCreate,
        saleController.create,
    );

saleRouter.route('/sale/:userId')
    .get(
        saleController.getAll,
    );

saleRouter.route('/delivered/:id')
    .patch(
        saleController.saleDelivered,
    );

module.exports = saleRouter;
