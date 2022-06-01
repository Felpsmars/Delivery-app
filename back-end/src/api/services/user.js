const { User } = require('../../database/models');
const { generateToken, hashPassword } = require('../utils/auth');
const ERRORS = require('../utils/error');

const login = async ({ email, password }) => {
    const passwordHash = hashPassword(password);

    const findOneEmail = await User.findOne({
        where: { email },
    });
    if (!findOneEmail) throw ERRORS.USER.NOT_FOUND_EMAIL;
    console.log('aqui');
    const findOneWithPassword = await User.findOne({
        where: { email, password: passwordHash },
    });
    if (!findOneWithPassword) {
        throw ERRORS.USER.NOT_FOUND_PASSWORD;
    }
    
    const token = await generateToken({ email });
    const { dataValues: { role } } = findOneWithPassword;
    return { token, role };
};
module.exports = { login };