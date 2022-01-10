const express = require('express');
const userRouter = require('./users');
const cardsRouter = require('./cards');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;
