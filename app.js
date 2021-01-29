const express = require('express')
const app = express()
const error = require('./middlewares/error')
const cors = require('cors')
const routes = require('./routes')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.use(error)


module.exports = app