const express = require("express");
const app = express();

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

// app.use(function (err, req, res, next) {
//   const errors = err.errors.map(error => error.message);
//   res.status(400).json({ errors });
//   // console.log(err);
// });
app.use(errorHandler);

module.exports = app;
