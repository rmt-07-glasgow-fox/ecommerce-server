if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(process.env.NODE_ENV);

const express = require("express");
const app = express();
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000
const cors = require('cors');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(errorHandler)
app.use(router)

module.exports = app