const router = require("express").Router();
const {
  create,
  banners,
  banner,
  update,
  destroy,
} = require("../controllers/banner");
const { authentificate, requireAdmin } = require("../middleware/auth");

router.use(authentificate);

router.get("/", banners);
router.get("/:id", banner);

router.post("/", requireAdmin, create);
router.put("/:id", requireAdmin, update);
router.delete("/:id", requireAdmin, destroy);

module.exports = router;
