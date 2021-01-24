const router = require("express").Router()
const UserController = require ("../controllers/userController")
const products = require("./products")
const { checkLogin } = require ("../middlewares/auth")

router.post ("/login", UserController.login)
router.post ("/register", UserController.register)
router.use (checkLogin)
router.use ("/products", products)


module.exports = router