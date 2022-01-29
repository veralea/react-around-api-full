const express = require('express');

const router = express.Router();
const validator = require('validator');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');

const {
  getAllUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

router.get('/', getAllUsers);
router.get('/me', getProfile);
router.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);
router.use(errors());

module.exports = router;
