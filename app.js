const express = require('express')
const app = express()
const router = require('./routes')
const {errorHandler} = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended:true}))

app.use('/',router)
app.use(errorHandler)

module.exports = app
