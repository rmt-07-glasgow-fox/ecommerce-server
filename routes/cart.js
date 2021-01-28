const express = require("express")
const router = express.Router()
const CartController = require("../controllers/cartController")
const {authenticate} = require('../middlewares/authenticate')

router.use(authenticate)
router.get(`/`, CartController.getAll)
router.post(`/:ProductId`, CartController.add)
router.patch(`/:id/add`, CartController.increaseQty)
router.patch(`/:id/remove`, CartController.decreaseQty)
router.delete(`/:id`, CartController.delete)

module.exports = router