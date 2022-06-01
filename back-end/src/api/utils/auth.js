const jwt = require('jsonwebtoken');
const fs = require('fs');
const md5 = require('md5');

const generateToken = async (data) => {
    const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    const jwtConfig = {
        expiresIn: '1d',
    };
    const token = jwt.sign(data, SECRET, jwtConfig);
    return token;
};

const hashPassword = (password) => md5(password);

module.exports = { generateToken, hashPassword };