const Card = require('../models/card');
const {
  NOT_FOUND_ERROR_CODE,
  CREATED_CODE,
  SUCCESS_CODE,
} = require('../utils/constants');
const errorHandler = require('../utils/functions');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(SUCCESS_CODE).send(cards))
    .catch((err) => errorHandler(err, res));
};

const getOneCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => errorHandler(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => errorHandler(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((card) => {
      res.status(SUCCESS_CODE).send((card));
    })
    .catch((err) => errorHandler(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => errorHandler(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(SUCCESS_CODE).send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

module.exports = {
  getAllCards,
  getOneCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
