const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController.js");

router.get("/", CartController.getCarts);
router.post("/", CartController.createCart);
router.put("/", CartController.updateQuantity);
router.delete("/", CartController.deleteCart);
router.get("/checkout", CartController.checkoutCart);

module.exports = router;
