(process.env.NODE_ENV === 'developement' || process.env.NODE_ENV === 'test') &&
  require('dotenv').config();

const express = require('express')
const router = require('./routes')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

module.exports = app