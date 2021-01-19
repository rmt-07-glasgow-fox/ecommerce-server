const env = process.env.NODE_ENV || 'development';
if ( env === 'development' || env === 'test') require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routers = require('./routes/');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routers);

module.exports = app;