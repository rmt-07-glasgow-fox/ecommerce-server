const express = require('express')
const router = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandlers')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errorHandler)

module.exports = app