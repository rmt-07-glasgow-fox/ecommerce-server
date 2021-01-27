const router = require("express").Router();
const {
  create,
  products,
  product,
  update,
  destroy,
} = require("../controllers/product");
const { authentificate, requireAdmin } = require("../middleware/auth");


router.use(authentificate);

router.get("/", products);
router.get("/:id", product);

router.post("/", requireAdmin, create);
router.put("/:id", requireAdmin, update);
router.delete("/:id", requireAdmin, destroy);

module.exports = router;
