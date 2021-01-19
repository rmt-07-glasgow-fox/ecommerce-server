const express = require('express')
const app = express()
const router = require('./routers/index')
const errHandling = require('./middlewares/errHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)
app.use(errHandling)

module.exports = app