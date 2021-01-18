const { ProductController } = require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/', ProductController.addProducts)
router.put('/:id', ProductController.editProducts)

module.exports = router