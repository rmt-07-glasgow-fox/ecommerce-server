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
router.use(authorize);

router.post("/", create);
// router.get('/products', products)
// router.get('/products/:id', product)
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
