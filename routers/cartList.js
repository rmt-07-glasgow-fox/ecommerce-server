const router = require("express").Router()
// const ProductController = require("../controllers/product")
const CartController = require("../controllers/cart")
const {authorizeCust} = require("../middlewares/auth")

router.post("/", CartController.add)
router.get("/unpaid", CartController.allCarts)
router.get("/paid", CartController.allHistories)
router.patch("/:id/plus", CartController.quantityPlus)
router.patch("/:id/min", CartController.quantitMin)
router.put("/", CartController.checkout)
router.delete("/:id", CartController.delete)

module.exports = router