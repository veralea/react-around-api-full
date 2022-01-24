require('dotenv').config();
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
       const err = new AuthError('Authorization required!');
       next(err);
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token,
        NODE_ENV === 'production' ? JWT_SECRET : 'secret'
        );
    } catch (e) {
      const err = new AuthError('Authorization required!!!');
      next(err);
    }

    req.user = payload;
    next();
};
