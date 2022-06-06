const { Router } = require('express');

const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/user');
const authMiddleware = require('../middlewares/auth');

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

userRouter.route('/register')
    .post(
        userMiddleware.validateCreate,
        userController.create,
    );

userRouter.route('/register')
    .post(
        userMiddleware.validateCreate,
        userController.create,
    );
    
userRouter.route('/validateToken')
    .get(
        authMiddleware.validateToken,
        userController.validateToken,
    );

module.exports = userRouter;
