const router = require("express").Router();
const {
  create,
  products,
  product,
  update,
  destroy,
} = require("../controllers/product");
const { authentificate, requireAdmin } = require("../middleware/auth");

router.get("/", products);
router.get("/:id", product);

router.use(authentificate);

router.post("/", requireAdmin, create);
router.put("/:id", requireAdmin, update);
router.delete("/:id", requireAdmin, destroy);

module.exports = router;
