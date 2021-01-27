const express = require("express")
const router = express.Router()
const CartController = require("../controllers/cartController")
const authorization = require('../middlewares/authorization')
const {authenticate} = require('../middlewares/authenticate')

router.use(authenticate)
router.get(`/`, CartController.getAll)
router.post(`/:ProductId`, CartController.add)
router.use(authorization)
router.patch(`/:id/add`, CartController.increaseQty)
router.patch(`/:id/remove`, CartController.decreaseQty)
router.delete(`/:id`, CartController.delete)
// router.patch('/:id', CartController.patch)

module.exports = router