if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
    require('dotenv').config()
}

const express = require('express');
const app = express()
const cors = require('cors')
const routers = require('./routes')
const { errHandlers } = require('./middlewares');

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }
//     next()
// })
app.use(cors())

app.use(routers)
app.use(errHandlers)

module.exports = app