const userSchema = require('../schemas/user');

const validateGetAllByRole = async (req, res, next) => {
    await userSchema.getAllByRole.validateAsync(req.params);
    return next();
};

const validateLogin = async (req, _res, next) => {
    const { email, password } = req.body;
    await userSchema.login.validateAsync({ email, password });
    return next();
};

const validateCreate = async (req, _res, next) => {
    const { name, email, password } = req.body;
    await userSchema.create.validateAsync({ name, email, password });
    return next();
};

module.exports = { validateGetAllByRole, validateLogin, validateCreate };