if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes endpoint
app.use(router)

// app.use(errorHandler)

module.exports = app