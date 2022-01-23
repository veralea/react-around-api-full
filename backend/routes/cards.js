const express = require('express');
const {
  getAllCards, getOneCard, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getAllCards);
router.get('/:cardId', getOneCard);
router.post('/', createCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
