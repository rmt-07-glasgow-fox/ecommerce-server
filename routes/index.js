const express = require('express')
const router = express.Router()
//const UserController = require('../controllers/user.js')

const productsRouter = require('./products')

//router('/login', UserController.login)

router.use('/products', productsRouter)

module.exports = router

