const express = require("express");
const { getAllCategories, createNewCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const protect = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(protect);

router.get("/", getAllCategories);
router.post("/", createNewCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;