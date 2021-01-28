if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routers/index')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandlers)
function errorHandlers(err, req, res, next) {
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({message: 'Please provide a token!'})
  }
  if (err.name === 'SequelizeValidationError') {
    let errMessages = []
    err.errors.forEach(element => {
      errMessages.push(element.message)
    });
    return res.status(400).json({message: errMessages})
  }

  console.log(err);
  res.status(500).json(err)
} 

module.exports = app
