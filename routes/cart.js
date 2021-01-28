const router = require('express').Router()
const cartController = require("../controllers/cartController")

router.get("/carts", cartController.getCarts)
router.put("/carts", cartController.checkout)
router.get("/carts/:id", cartController.getCart)
router.post("/carts", cartController.create)
router.patch("/carts/:id/edit", cartController.edit)
router.delete("/carts/:id/delete", cartController.delete)

module.exports = router