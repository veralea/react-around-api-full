const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
  CREATED_CODE,
  SUCCESS_CODE,
} = require('../utils/constants');
const errorHandler = require('../utils/functions');

const updateUserInfo = (filter, update, res) => {
  User.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => errorHandler(err, res));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => errorHandler(err, res));
};

const getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => errorHandler(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, about, avatar, email, password: hash })
    })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => errorHandler(err, res));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  const filter = { _id: req.user._id };
  const update = { name, about };

  updateUserInfo(filter, update, res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const filter = { _id: req.user._id };
  const update = { avatar };

  updateUserInfo(filter, update, res);
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id },'some-secret-key',{ expiresIn: '7d' });
    res.send({ token });
  })
  .catch((err) => {
    res
      .status(401)
      .send({ message: err.message });
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
  login
};
