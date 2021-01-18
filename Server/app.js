// require
const express = require('express')
const app = express()
const port = 7500
const userRoute = require('./routes/user-route')
const materialRoute = require('./routes/material-route')
const bannerRoute = require('./routes/banner-route')
const { errorHandle } = require('./middlewares/error-handling')
const cors = require('cors')

// setting
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routing
app.use(userRoute)
app.use(materialRoute)
app.use(bannerRoute)
app.use(errorHandle)

module.exports = app