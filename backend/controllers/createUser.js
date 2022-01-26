const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { CREATED_CODE } = require('../utils/constants');
const ExistError = require('../errors/exist-err');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
        User.create({ name, about, avatar, email, password: hash })
    })
    .then((user) => {
      // if (!user) {
      //   throw new ExistError('User already exists');
      // }
      res.status(CREATED_CODE).send(user);
    })
    .catch(err => {
      if(err.code === 11000){
        const error =  new ExistError('User already exists');
        next(error);
      }
      next(err);
    });
};

module.exports = {
  createUser
}
