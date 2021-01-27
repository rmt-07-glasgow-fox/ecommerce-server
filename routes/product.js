const router = require("express").Router()
const { ProductController } = require("../controllers")

router.post("/", ProductController.create)
router.get("/", ProductController.read)
router.get("/:id", ProductController.findProd)
// router.get("/:id", ProductController.detail)
router.put("/:id", ProductController.update)
router.delete("/:id", ProductController.delete)

module.exports = router
