const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const ProductController = require("../controllers/productController")

const authorization = require('../middlewares/roleAuthorization')

router.use(authorization);

router.get(`/products`, ProductController.getAll)
router.post(`/products`, ProductController.add)
router.get(`/products/:id`, ProductController.getById)
router.put(`/products/:id`, ProductController.update)
router.delete(`/products/:id`, ProductController.delete)

module.exports = router