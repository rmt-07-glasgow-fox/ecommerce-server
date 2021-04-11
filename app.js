const express = require('express')
const routes = require('./routes')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

module.exports = app