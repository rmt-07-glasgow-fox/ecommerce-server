const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const CartController = require("../controllers/cartController")
const HistoryController = require("../controllers/historyController")

router.get("/product", ProductController.getProduct)
router.get("/cart",authentication, CartController.fetchCart)
router.get("/history",authentication, HistoryController.fetchHistory)
router.post("/history",authentication, HistoryController.addHistory)
router.post("/cart",authentication, CartController.addCart)
router.delete("/cart",authentication, CartController.deleteCart)
router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.post("/product",authentication , ProductController.createProduct)
router.get("/product/:id",authentication , ProductController.getProductById)
router.put("/product/:id",authentication , ProductController.editProduct)
router.delete("/product/:id",authentication , ProductController.deleteProduct)



module.exports = router