/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable import/newline-after-import */
const express = require('express');
const app = express();
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
/*const persons = require('./db.json');*/
const cors = require('cors');
const dbConnect = require('./config/db.config');
dbConnect();
require('dotenv').config();

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const ContactRouter = require('./routes/Contact.router');
app.use('/contact', ContactRouter);

const log = fs.createWriteStream(
  path.join(__dirname, './logs', `${moment().format('DD-MM-YYYY')}.log`),
  { flags: 'a' }
);

morganBody(app, {
  noColors: true,
  stream: log,
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  }

  next(error);
};

app.use(errorHandler);

app.listen(Number(process.env.PORT), () => {
  console.log('Server up at port: ', process.env.PORT);
});
