const express = require("express");
const router = express.Router();
const productRoutes = require("./product");
const userRoutes = require("./user.js");
const categoryRoutes = require("./category")
const customerRoutes = require("./customer")
const cartRoutes = require("./cart")
const { authenticate, authenticateCustomer } = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.use("/", userRoutes);
router.use("/", customerRoutes);
router.use("/products", productRoutes);
router.use("/carts", authenticateCustomer, cartRoutes);
router.use("/categories", authenticate, categoryRoutes);

module.exports = router;
