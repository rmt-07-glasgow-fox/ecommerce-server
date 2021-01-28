const router = require('express').Router()
const wishlistController = require("../controllers/wishlistController")

router.get("/wishlists", wishlistController.getWishlists)
router.post("/wishlists", wishlistController.create)
router.delete("/wishlists/:id/delete", wishlistController.delete)

module.exports = router