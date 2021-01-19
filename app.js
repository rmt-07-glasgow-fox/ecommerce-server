if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const router = require('./routers/index.js');
const errorHandlers = require('./middlewares/errorHandlers.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandlers);

module.exports = app;
