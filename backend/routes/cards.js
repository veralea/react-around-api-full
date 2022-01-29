const express = require('express');

const validator = require('validator');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');

const {
  getAllCards, getOneCard, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

const router = express.Router();
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

router.get('/', getAllCards);
router.get(
  '/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().required(),
    }),
  }),
  getOneCard,
);
router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);
router.put(
  '/likes/:cardId/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().required(),
    }),
  }),
  likeCard,
);
router.delete(
  '/likes/:cardId/',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().required(),
    }),
  }),
  dislikeCard,
);
router.delete(
  '/:cardId/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().required(),
      userId: Joi.string().hex().required(),
    }),
  }),
  deleteCard,
);
router.use(errors());

module.exports = router;
