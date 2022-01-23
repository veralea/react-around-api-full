const express = require('express');
const path = require('path');
//const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const route = require('./routes/route');
const limiter = require('./utils/limiter');
const { MONGO_SERVER } = require('./utils/constants');
const { createUser } = require('./controllers/createUser');
const { login } = require('./controllers/login');
const auth = require('./middleware/auth');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
//app.use(cors());

const allowedCors = [
  'https://veralea.students.nomoreparties.sbs',
  'http://veralea.students.nomoreparties.sbs',
  'https://www.veralea.students.nomoreparties.sbs',
  'http://www.veralea.students.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',

];

app.use(function(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.send();
  }

  next();
});

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/', route);
app.use(limiter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
