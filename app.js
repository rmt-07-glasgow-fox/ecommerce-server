if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const user = require('./routers/user')
const product = require('./routers/product')
const { authenticate } = require('./middleware/auth')

app.use(express.urlencoded({ extended:true}))
app.use(express.json)

app.get('/', (req, res) => {
    res.send('hello app')
})
app.use(user)
app.use(authenticate)
app.use(product)

module.exports = app