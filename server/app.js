if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
  require('dotenv').config()
}

const { errorHandler } = require('./middlewares')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(router)
app.use(errorHandler)

module.exports = app

