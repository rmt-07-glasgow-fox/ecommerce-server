const router = require("express").Router();
const CartController = require("../controllers/CartController");
const { authenticateGeneral, authorizeCart } = require("../middlewares/auth");

router.use(authenticateGeneral);
router.post("/", CartController.addCart);
router.get("/", CartController.listCart);
// router.get("/:id", authorizeCart, CartController.getSpecific);
// router.put("/:id", authorizeCart, CartController.updateCart);
router.patch("/:id", authorizeCart, CartController.patchCart); // ganti amount
router.delete("/:id", authorizeCart, CartController.deleteCart);
router.post("/checkout", CartController.checkOut);

module.exports = router;
