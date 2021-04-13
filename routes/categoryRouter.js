const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController")

// router.post("/", CategoryController.addCategory);
router.get("/", CategoryController.listCategory);
// router.get("/:id", CategoryController.getSpecific);
// router.put("/:id", CategoryController.updateCategory);
// router.patch("/:id", CategoryController.patchCategory);
// router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
