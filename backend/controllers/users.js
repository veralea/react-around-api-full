const User = require('../models/user');
const { SUCCESS_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const RightsError = require('../errors/rights-err');
const DataError = require('../errors/data-err');


const updateUserInfo = (filter, update, res, next) => {
  User.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('No user found with that id');
    })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if(!users) {
        throw new RightsError('No rights to receive all users');
      }
      res.status(SUCCESS_CODE).send(users);
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('No user found with that id');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const filter = { _id: req.user._id };
  const update = { name, about };

  if (!filter || !update) {
    const err = new DataError('Invalid profile data sent!');
    next(err);
  }
  updateUserInfo(filter, update, res);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const filter = { _id: req.user._id };
  const update = { avatar };
  if (!filter || !update) {
    const err = new DataError('Invalid avatar data sent!');
    next(err);
  }
  updateUserInfo(filter, update, res);
};



module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  updateAvatar
};
