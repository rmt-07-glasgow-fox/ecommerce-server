const router = require("express").Router()
const ProductController = require("../controllers/product")
const {authorize} = require("../middlewares/auth")

router.post("/products", ProductController.add)
router.get("/products", ProductController.getAll)
router.get("/products/:id", authorize, ProductController.findCurrent)
router.put("/products/:id", authorize, ProductController.put)
router.delete("/products/:id", authorize, ProductController.delete)

module.exports = router