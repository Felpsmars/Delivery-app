const userSchema = require('../schemas/user');

const validateGetAll = async (req, res, next) => {
    const filter = await userSchema.getAll.validateAsync(req.body);
    res.locals = { filter };
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

module.exports = { validateGetAll, validateLogin, validateCreate };