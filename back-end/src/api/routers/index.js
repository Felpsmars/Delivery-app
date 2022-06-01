const { Router } = require('express');
const userRouter = require('./user');
const errorMiddleware = require('../middlewares/error');

const appRouter = Router();
appRouter.use(userRouter);
appRouter.use(errorMiddleware);

module.exports = appRouter;
