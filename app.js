if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const user = require('./routers/user')
const port = 3000

app.use(express.urlencoded({ extended:true}))
app.use(express.json)

app.get('/', (req, res) => {
    res.send('hello app')
})
app.use(user)

module.exports = app