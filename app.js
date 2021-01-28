const cors = require('cors')
const express = require('express')
const app = express()
const { errorHandlers } = require('./middlewares/errorHandler')

const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(routes)
app.use(errorHandlers)

module.exports = app