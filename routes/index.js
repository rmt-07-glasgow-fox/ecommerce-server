const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const categoryRoutes = require("./category")
const bannerRoutes = require("./banner")
const cartRoutes = require("./cart")

router.use("/api/users", userRoutes);
router.use("/api/products", productRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/banners", bannerRoutes);
router.use("/api/carts", cartRoutes)

router.use("/", (req, res, next) => {
  res.send("welcome to h8 e-commerce server");
});

module.exports = router;
