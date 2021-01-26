const router = require('express').Router()
const cartController = require("../controllers/cartController")

router.get("/carts", cartController.getCarts)
router.get("/carts/:id", cartController.getCart)
router.post("/carts", cartController.create)
router.patch("/carts/:id/edit", cartController.editCart)
router.delete("/carts/:id/delete", cartController.deleteCart)

module.exports = router