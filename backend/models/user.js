const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    required: [true, 'User avatar link required'],
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      }
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Incorrect email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Incorrect email or password');
          }
          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
