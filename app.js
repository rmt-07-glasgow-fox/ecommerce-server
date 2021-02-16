const express = require('express')
const router = require('./routes')
const errorHandlers = require('./middlewares/errorHandlers')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandlers)

module.exports = app