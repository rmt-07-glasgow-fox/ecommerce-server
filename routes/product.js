const router = require("express").Router();
const {
  create,
  products,
  product,
  update,
  destroy,
} = require("../controllers/product");
const { authentificate, authorize } = require("../middleware/auth");


router.use(authentificate);

router.get("/", products);
router.get("/:id", product);

router.post("/", authorize, create);
router.put("/:id", authorize, update);
router.delete("/:id", authorize, destroy);

module.exports = router;
