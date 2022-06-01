const { Op } = require('sequelize');
const { User } = require('../../database/models');
const { generateToken, hashPassword } = require('../utils/auth');
const ERRORS = require('../utils/error');

const login = async ({ email, password }) => {
    const passwordHash = hashPassword(password);

    const findOneEmail = await User.findOne({
        where: { email },
    });
    if (!findOneEmail) throw ERRORS.USER.NOT_FOUND_EMAIL;

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

const create = async ({ name, email, password }) => {
    const findOneUser = await User.findOne({
        where: { [Op.or]: [{
            email,
        }, {
            name,
        }] },
    });
    const hashedPassword = hashPassword(password);
    if (findOneUser) throw ERRORS.USER.ALREADY_EXISTS;
    const user = await User.create({ name, email, password: hashedPassword, role: 'customer' }); 
    return user;
};
module.exports = { login, create };