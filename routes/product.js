const router = require('express').Router()
const productController = require("../controllers/productController")

router.post("/products", productController.create)
router.get("/products", productController.getProducts)
router.put("/products/:id", productController.editProduct)
router.delete("/products/:id", productController.deleteProduct)

module.exports = router