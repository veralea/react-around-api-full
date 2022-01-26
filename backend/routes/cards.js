const express = require('express');
const {
  getAllCards, getOneCard, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { celebrate, Joi, errors, Segments } = require('celebrate');

const router = express.Router();

router.get('/', getAllCards);
router.get('/:cardId', getOneCard);
router.post('/', createCard);
router.put('/likes/:cardId',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required()
  })
}),
likeCard);
router.delete('/likes/:cardId',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required()
  })
}),
dislikeCard);
router.delete('/:cardId',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required()
  })
}),
deleteCard);
router.use(errors());

module.exports = router;
