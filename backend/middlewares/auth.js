const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/AuthErr');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthErr('Нужно авторизоваться');
  }
  // извлечем токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  // верифицируем токен
  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthErr('Нужно авторизоваться');
  }
  req.user = payload;
  next();
};

module.exports = auth;
