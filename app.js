if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')

//middleware / body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
//routes
app.use(routes)
//error handler
app.use(errorHandler)


module.exports = app