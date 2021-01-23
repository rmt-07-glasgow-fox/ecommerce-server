if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config();
const express = require('express');
const error = require('./middlewares/error')
const cors  = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(error)

module.exports = app;   