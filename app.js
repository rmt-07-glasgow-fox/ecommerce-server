// express
const express = require('express')
const app = express()

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('assets'))

// router
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')

app.use('/', (req, res) => { res.send('Welcome to ecommerce server by abdul rozak') })
app.use('/user', userRouter)
app.use('/product', productRouter)

module.exports = app