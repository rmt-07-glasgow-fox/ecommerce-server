const router = require("express").Router()
const ProductController = require("../controllers/product")
const {authenticate, authorize} = require("../middlewares/auth")

router.get("/", ProductController.getAll)

router.use(authenticate)
router.post("/", ProductController.add)
router.get("/:id", authorize, ProductController.findCurrent)
router.put("/:id", authorize, ProductController.put)
router.delete("/:id", authorize, ProductController.delete)

module.exports = router