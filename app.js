const express = require('express')
const app = express()
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/error-handler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errorHandler)

module.exports = app