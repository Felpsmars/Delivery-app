const { Router } = require('express');
const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/user');

const userRouter = Router();
userRouter.route('/')
    .post(
        userMiddleware.validateLogin,
        userController.login,
    );

userRouter.route('/login')
    .post(
        userMiddleware.validateLogin,
        userController.login,
    );

module.exports = userRouter;