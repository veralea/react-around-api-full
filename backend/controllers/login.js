const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Invalid email or password');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
};
