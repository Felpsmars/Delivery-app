const userService = require('../services/user');

const getAllByRole = async (req, res) => {
    const { role } = req.params;
    const users = await userService.getAllByRole(role);

    return res.status(200).json(users);
};

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

module.exports = { getAllByRole, login, create, validateToken };
