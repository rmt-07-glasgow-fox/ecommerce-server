const router = require('express').Router()
const productController = require("../controllers/productController.js")

router.get('/', productController.get)
router.get('/:id', productController.getOne)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router