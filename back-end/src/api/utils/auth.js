const jwt = require('jsonwebtoken');
const fs = require('fs');

const generateToken = async (data) => {
    const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    const jwtConfig = {
        expiresIn: '1d',
    };
    const token = jwt.sign( data, SECRET, jwtConfig ) ;
    return token;
}
module.exports = { generateToken };