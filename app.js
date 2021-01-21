const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(routes);
app.use(errorHandler);

module.exports = app;

// app.listen(port, () => {
//   console.log("http://localhost:" + port);
// });
