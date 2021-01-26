const router = require("express").Router();
const {
  create,
  banners,
  banner,
  update,
  destroy,
} = require("../controllers/banner");
const { authentificate, authorize } = require("../middleware/auth");

router.use(authentificate);

router.get("/", banners);
router.get("/:id", banner);

router.post("/", authorize, create);
router.put("/:id", authorize, update);
router.delete("/:id", authorize, destroy);

module.exports = router;
