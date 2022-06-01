const userSchema = require('../schemas/user');

const validateLogin = async (req, _res, next) => {
    const { email, password } = req.body;
    await userSchema.login.validateAsync({ email, password });
    return next();
};

const validateCreate = async (req, _res, next) => {
    const { name, email, password } = req.body;
    await userSchema.login.validateAsync({ name, email, password });
    return next();
};

module.exports = { validateLogin, validateCreate };