const router = require("express").Router();
const {
  create,
  categories,
  category,
  update,
  destroy,
} = require("../controllers/category");
const { authentificate, requireAdmin } = require("../middleware/auth");

router.get("/", categories);
router.get("/:id", category);

router.use(authentificate);

router.post("/", requireAdmin, create);
router.put("/:id", requireAdmin, update);
router.delete("/:id", requireAdmin, destroy);

module.exports = router;
