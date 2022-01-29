const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, Segments } = require('celebrate');
const cors = require('cors');
const route = require('./routes/route');
const limiter = require('./utils/limiter');
const { MONGO_SERVER } = require('./utils/constants');
const { createUser } = require('./controllers/createUser');
const { login } = require('./controllers/login');
const auth = require('./middleware/auth');
const handleErr = require('./middleware/handle-err');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(BodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.use(auth);
app.use('/', route);
app.use(limiter);
app.use(errorLogger);
app.use(handleErr);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
