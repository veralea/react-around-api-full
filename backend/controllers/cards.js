const Card = require('../models/card');
const {
  CREATED_CODE,
  SUCCESS_CODE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const RightsError = require('../errors/rights-err');
const DataError = require('../errors/data-err');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new RightsError('no rights to receive all cards');
      }
      res.status(SUCCESS_CODE).send(cards)})
    .catch(next);
};

const getOneCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card found with that id');
      }
      res.status(SUCCESS_CODE).send(card);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      if (!user) {
        throw new DataError('Invalid new card data');
      }
      res.status(CREATED_CODE).send(user)
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('No card found with that id');
    }
    res.status(SUCCESS_CODE).send((card));
  })
  .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('No card found with that id');
    }
    res.status(SUCCESS_CODE).send(card);
  })
  .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No card found with that id');
      }
      res.status(SUCCESS_CODE).send({ data: user })
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  getOneCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
