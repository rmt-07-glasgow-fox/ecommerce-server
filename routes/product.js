const router = require("express").Router();
const {
  create,
  products,
  product,
  update,
  destroy,
} = require("../controllers/product");
const { authentificate } = require("../middleware/authentificate");
const authorize = require("../middleware/authorize");

router.use(authentificate);

router.get("/", products);
router.get("/:id", product);

router.post("/", authorize, create);
router.put("/:id", authorize, update);
router.delete("/:id", authorize, destroy);

module.exports = router;
