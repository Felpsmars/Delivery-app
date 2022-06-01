const userService = require('../services/user');

const login = async (req, res ) => { 
    const { password, username } = req.body;
    const token = await userService.login({ password, username });

    return res.status(200).json({ token });
};

module.exports = { login };
