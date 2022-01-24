const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const route = require('./routes/route');
const limiter = require('./utils/limiter');
const { MONGO_SERVER } = require('./utils/constants');
const { createUser } = require('./controllers/createUser');
const { login } = require('./controllers/login');
const auth = require('./middleware/auth');
const mycors = require('./middleware/mycors');
const handleErr = require('./middleware/handle-err');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(mycors);
mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/', route);
app.use(limiter);
app.use(handleErr);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
