const userService = require('../services/user');

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

module.exports = { login, create };
