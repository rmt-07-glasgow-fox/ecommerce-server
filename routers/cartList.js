const router = require("express").Router()
// const ProductController = require("../controllers/product")
const CartController = require("../controllers/cart")
const {authorizeCust} = require("../middlewares/auth")

router.post("/", CartController.add)
router.get("/", CartController.allCarts)
router.patch("/:id/plus", authorizeCust, CartController.quantityPlus)
router.patch("/:id/min", authorizeCust, CartController.quantitMin)
router.put("/:id", authorizeCust, CartController.quantitMin)
router.delete("/:id", authorizeCust, CartController.delete)

module.exports = router