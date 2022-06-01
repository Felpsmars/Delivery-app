const { User } = require('../../database/models/');
const { generateToken } = require('../utils/auth');

const login = async ({ password, username }) => {
    const findOneUser = await User.findOne({
        where: {
            username,
        }
    });
    if(!findOneUser) throw Error({ isExpected: true, code: 404, message: 'User not found'})

    const findOneWithPassword = await User.findOne({
        where: {
            username,
            password
        }
    });
    if(!findOneWithPassword) throw Error({ isExpected: true, code: 404, message: 'Wrong password'});
    
    const token = await generateToken(username);
    return token; 
};
module.exports = { login };