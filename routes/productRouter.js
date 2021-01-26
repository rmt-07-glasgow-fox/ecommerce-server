const router = require("express").Router();
const ProductController = require("../controllers/ProductController")
const { authenticateAdmin } = require("../middlewares/auth");

router.post("/", ProductController.addProduct);
router.get("/", ProductController.listProduct);
router.get("/:id", ProductController.getSpecific);
router.use(authenticateAdmin); //pastikan adalah admin
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
