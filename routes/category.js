const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController")
const { authorize, authorizeCheckCategory } = require("../middlewares/auth.js");

router.get("/", CategoryController.getCategories);
router.post("/", authorize, CategoryController.createCategory);
router.get("/:id", authorize, authorizeCheckCategory, CategoryController.getCategory);
router.put("/:id", authorize, authorizeCheckCategory, CategoryController.updateCategory);
router.delete("/:id", authorize, authorizeCheckCategory, CategoryController.deleteCategory);

module.exports = router;
