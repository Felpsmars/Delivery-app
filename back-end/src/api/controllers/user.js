const userService = require('../services/user');

const getAll = async (req, res) => {
    const { filter } = res.locals;
    const users = await userService.getAll(filter);

    return res.status(200).json(users);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });

    return res.status(200).json({ user });
};

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userService.create({ name, email, password });
    return res.status(201).json({ user });
};

const validateToken = async (_req, res) => res.status(200).json({
    message: 'Token validated successfully!',
});

module.exports = { getAll, login, create, validateToken };
