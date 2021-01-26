const router = require('express').Router()
const user = require("./user")
const product = require("./product")
const banner = require("./banner")
const cart = require('./cart')
const {authentication} = require("../middlewares/auth")
const productController = require('../controllers/productController')

router.use(user)
router.get("/products", productController.getProducts)
router.get("/products/:id", productController.getProduct)
router.use(authentication)
router.use(product)
router.use(banner)
router.use(cart)

module.exports = router