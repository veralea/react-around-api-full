const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../utils/functions');
const { CREATED_CODE } = require('../utils/constants');
const ExistError = require('../errors/exist-err');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, about, avatar, email, password: hash })
    })
    .then((user) => {
      if(!user) {
        throw new ExistError("User with this email exists in database")
      }
      res.status(CREATED_CODE).send(user)
    })
    .catch(next);
};

module.exports = {
  createUser
}
