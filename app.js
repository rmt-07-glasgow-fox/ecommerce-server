const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

module.exports = app;