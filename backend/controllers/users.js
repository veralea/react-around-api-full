const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
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

const getProfile = (req, res) => {
  User.findById(req.user._id)
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

// const getOneUser = (req, res) => {
//   User.findById(req.params.userId)
//     .orFail(() => {
//       const error = new Error('No user found with that id');
//       error.statusCode = NOT_FOUND_ERROR_CODE;
//       throw error;
//     })
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => errorHandler(err, res));
// };


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



module.exports = {
  getAllUsers,
  getProfile,
  // getOneUser,
  updateProfile,
  updateAvatar
};
