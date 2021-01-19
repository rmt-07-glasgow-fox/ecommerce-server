if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
    require('dotenv').config()
}

const express = require('express');
const app = express()
const cors = require('cors')
const routers = require('./routes')
const { errHandlers } = require('./middlewares');

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(cors())

app.use(routers)
app.use(errHandlers)

module.exports = app