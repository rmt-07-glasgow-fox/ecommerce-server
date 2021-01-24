const router = require('express').Router()
const productController = require("../controllers/productController")
const {authorization} = require("../middlewares/auth")

router.get("/products", productController.getProducts)
router.get("/products/:id", productController.getProduct)
router.post("/products", authorization, productController.create)
router.put("/products/:id/edit", authorization, productController.editProduct)
router.delete("/products/:id/delete", authorization, productController.deleteProduct)

module.exports = router