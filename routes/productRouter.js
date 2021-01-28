const router = require('express').Router()
const productController = require("../controllers/productController.js")
const authorize = require("../middlewares/authorization")


router.get('/:id', productController.getOne)
router.post('/', authorize, productController.create)
router.put('/:id', authorize, productController.update)
router.delete('/:id', authorize, productController.delete)

module.exports = router