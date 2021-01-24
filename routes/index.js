const { request } = require("express");
const express = require("express");
const router = express.Router();
const productRoutes = require("./product");
const userRoutes = require("./user.js");
const { authenticate } = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.use("/", userRoutes);
router.use(authenticate);
router.use("/products", productRoutes);

module.exports = router;
