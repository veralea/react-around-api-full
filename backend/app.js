const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const route = require('./routes/route');
const limiter = require('./utils/limiter');
const { MONGO_SERVER } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(MONGO_SERVER);
app.use((req, res, next) => {
  req.user = {
    _id: '61bf287a2ab857e35fecb13c',
  };
  next();
});
app.use(helmet());
app.use(express.json());
app.use('/', route);
app.use(limiter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
