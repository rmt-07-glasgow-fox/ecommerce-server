const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")


router.get("/product",ProductController.getProduct)
router.post("/login", UserController.login)
router.post("/product",authentication , ProductController.createProduct)
router.put("/product/:id",authentication , ProductController.editProduct)
router.delete("/product/:id",authentication , ProductController.deleteProduct)



module.exports = router