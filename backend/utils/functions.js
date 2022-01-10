const {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  VALID_ERROR_CODE,
} = require('./constants');

const errorHandler = (err, res) => {
  if (err.statusCode === VALID_ERROR_CODE) {
    res.status(VALID_ERROR_CODE).send({ message: err.message });
    return;
  }
  if (err.statusCode === NOT_FOUND_ERROR_CODE) {
    res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: err.message });
};

module.exports = errorHandler;
