const fs = require('fs');
const jwt = require('jsonwebtoken');
const ERRORS = require('../utils/error');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  try {
    jwt.verify(authorization, SECRET);
  } catch (e) {
    return next(ERRORS.AUTH.INVALID_TOKEN);
  }

  return next();
};

module.exports = {
  validateToken,
};