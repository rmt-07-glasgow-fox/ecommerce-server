const router = require("express").Router()
const ProductController = require("../controllers/productController")
const { adminAuthorization } = require("../middlewares/auth")

router.get("/products", ProductController.getAllProduct)
router.post("/products", adminAuthorization, ProductController.createProduct)

module.exports = router