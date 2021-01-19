const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const { authorize } = require('../middlewares/auth')

router.post('/', ProductController.create)
router.put('/:id', authorize, ProductController.update)

module.exports = router

