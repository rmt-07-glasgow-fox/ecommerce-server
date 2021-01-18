const express = require("express");
const routers = require("./routers");
const errorHandlers = require('./middlewares/errorHandlers')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers)
app.use(errorHandlers)

module.exports = app
