const router = require("express").Router()
const ProductController = require("../controllers/productController")
const { adminAuthorization } = require("../middlewares/auth")

router.get("/products", ProductController.getAllProduct)
router.post("/products", adminAuthorization, ProductController.createProduct)
router.delete("/products/:id", adminAuthorization, ProductController.deleteProduct)

module.exports = router