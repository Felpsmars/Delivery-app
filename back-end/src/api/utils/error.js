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
  POST: {
    NOT_FOUND: Error(404, 'Post does not exist'),
    NOT_FOUND_CATEGORY: Error(400, '"categoryIds" not found'),
    INVALID_USER: Error(401, 'Unauthorized user'),
  },
};