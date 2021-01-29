const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(routes);
app.use(errorHandler);

module.exports = app;
