const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(indexRouter);
app.use(errorHandler)

module.exports = app;