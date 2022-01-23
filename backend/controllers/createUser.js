const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../utils/functions');
const { CREATED_CODE } = require('../utils/constants');

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, about, avatar, email, password: hash })
    })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => errorHandler(err, res));
};

module.exports = {
  createUser
}
