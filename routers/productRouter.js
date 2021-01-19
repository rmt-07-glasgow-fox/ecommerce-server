const router = require("express").Router()
const ProductController = require("../controllers/productController")
const { adminAuthorization } = require("../middlewares/auth")

router.get("/products", ProductController.getAllProduct)
router.get("/products/:id", ProductController.getOneProduct)
router.post("/products", adminAuthorization, ProductController.createProduct)
router.put("/products/:id", adminAuthorization, ProductController.updateProduct)
router.delete("/products/:id", adminAuthorization, ProductController.deleteProduct)

module.exports = router