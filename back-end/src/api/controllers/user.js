const userService = require('../services/user');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login({ email, password });

    return res.status(200).json({ user });
};

module.exports = { login };
