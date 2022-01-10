const express = require('express');
const {
  getAllCards, getOneCard, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getAllCards);
router.get('/:cardId', getOneCard);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
