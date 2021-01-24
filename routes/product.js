const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");
const { authorize, authorizeCheckData } = require("../middlewares/auth.js");

router.get("/", ProductController.getProducts);
router.post("/", authorize, ProductController.create);
router.get("/:id", authorize, authorizeCheckData, ProductController.getProduct);
router.put("/:id", authorize, authorizeCheckData, ProductController.updateProduct);
router.delete("/:id", authorize, authorizeCheckData, ProductController.deleteProduct);

module.exports = router;
