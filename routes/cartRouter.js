const router = require('express').Router()
const cartController = require("../controllers/cartController.js")
const { authorizeCart } = require("../middlewares/authorizeCart")


router.post('/', cartController.addCart)
router.get('/', cartController.getCart)
router.delete('/:id', authorizeCart, cartController.delCart)
router.put('/:id', authorizeCart, cartController.updateCart)

module.exports = router