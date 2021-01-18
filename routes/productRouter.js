const router = require('express').Router()
const productController = require("../controllers/productController.js")

router.post('/', productController.create)
router.put('/', productController.update)

module.exports = router