const Error = (code, message) => ({
  code,
  message,
  isExpected: true,
});

module.exports = {
  AUTH: {
    MISSING_TOKEN: Error(401, 'Token not found'),
    INVALID_TOKEN: Error(401, 'Expired or invalid token'),
  },
  USER: {
    NOT_FOUND_EMAIL: Error(404, 'User not found'),
    NOT_FOUND_PASSWORD: Error(404, 'Wrong password'),
    ALREADY_EXISTS: Error(409, 'User already registered'),
  },
  PRODUCT: {
    NOT_FOUND: Error(404, 'Product not found'),
  },
};