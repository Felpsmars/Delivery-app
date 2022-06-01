const userSchema = require('../schemas/user');

const validateLogin = async (req, _res, next) => {
    const { email, password } = req.body;
    await userSchema.login.validateAsync({ email, password });
    return next();
};
module.exports = { validateLogin };