if (process.env.NODE_DEV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(router);
app.use(errorHandler);

module.exports = app;