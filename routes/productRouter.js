const router = require("express").Router();
const ProductController = require("../controllers/ProductController")

router.post("/", ProductController.addProduct);
router.get("/", ProductController.listProduct);
router.get("/:id", ProductController.getSpecific);
router.put("/:id", ProductController.updateProduct);
// router.patch("/:id", ProductController.patchProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
