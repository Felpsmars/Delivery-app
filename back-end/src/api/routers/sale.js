const { Router } = require('express');

const saleController = require('../controllers/sale');

const productRouter = Router();

productRouter.route('/sale')
    .post(

        saleController.create,
    );

productRouter.route('/sale/:userId')
    .get(
        saleController.getAll,
    );

productRouter.route('/delivered/:id')
    .patch(
        saleController.saleDelivered,
    );

module.exports = productRouter;
