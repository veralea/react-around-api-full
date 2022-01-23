const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'secret',
      { expiresIn: '7d' });
    res.send({ token });
  })
  .catch((err) => {
    res
      .status(401)
      .send({ message: err.message });
  });
};

module.exports = {
  login
}
