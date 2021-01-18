const router = require("express").Router()
const ProductController = require("../controllers/productController")

router.post("/products", ProductController.createProduct)

module.exports = router