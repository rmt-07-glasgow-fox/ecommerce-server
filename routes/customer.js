const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/productController")
const {authenticate} = require('../middlewares/authenticate')

router.get(`/products`, ProductController.getAll)
router.use(authenticate)
router.get(`/products/:id`, ProductController.getById)
router.post(`/products`, ProductController.add)
router.put(`/products/:id`, ProductController.update)
router.delete(`/products/:id`, ProductController.delete)
// router.patch('/products/:id', ProductController.checkout)

module.exports = router