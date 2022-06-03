const { Router } = require('express');

const userRouter = require('./user');
const productRouter = require('./product');
const errorMiddleware = require('../middlewares/error');

const appRouter = Router();

appRouter.use(userRouter);
appRouter.use(productRouter);
appRouter.use(errorMiddleware);

module.exports = appRouter;
