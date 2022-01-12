const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
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
    required: true
  },
});

module.exports = mongoose.model('user', userSchema);
