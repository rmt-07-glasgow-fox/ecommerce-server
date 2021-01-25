const express = require("express");
const routers = require("./routers");
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers)
app.use(errorHandlers)

module.exports = app

