const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/product')

router.post('/', ProductController.create)

module.exports = router

