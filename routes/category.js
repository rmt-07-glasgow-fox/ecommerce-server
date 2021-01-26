const router = require("express").Router();
const {
  create,
  categories,
  category,
  update,
  destroy,
} = require("../controllers/category");
const { authentificate, authorize } = require("../middleware/auth");


router.use(authentificate);

router.get("/", categories);
router.get("/:id", category);

router.post("/", authorize, create);
router.put("/:id", authorize, update);
router.delete("/:id", authorize, destroy);

module.exports = router;
