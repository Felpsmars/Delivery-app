const userSchema = require('../schemas/user');

const validateLogin = async (req, _res, next) => {
    const { username, password } = req.body;
    await userSchema.login.validateAsync({ username, password });
    return next();
};
module.exports = { validateLogin };