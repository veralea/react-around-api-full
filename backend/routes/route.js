const express = require('express');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-err');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.get('*', (req, res, next) => {
  const error = new NotFoundError('Requested resource not found');
  next(error);
});

module.exports = router;
