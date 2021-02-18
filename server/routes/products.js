const router = require("express").Router()
const ProductController = require("../controllers/productController")
const { authorization } = require("../middlewares/auth")

router.get ("/", ProductController.listProduct)
router.post ("/", ProductController.addProduct)
router.get ("/:id", authorization, ProductController.getOne)
router.put ("/:id", authorization, ProductController.editProduct)
router.patch ("/:id", authorization, ProductController.moveProduct)
router.delete ("/:id", authorization, ProductController.removeProduct)

module.exports = router