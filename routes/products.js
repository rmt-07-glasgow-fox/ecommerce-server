const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/product')

router.post('/', ProductController.create)

router.put('/:id', ProductController.update)

module.exports = router

