const express = require("express");

const categoryController = require("../controllers/category-controller");

const router = express.Router();

router.post("/create", categoryController.createCategory);
router.get("/get/:categoryId", categoryController.getCategoryById);
router.get("/", categoryController.getAllCategories);

module.exports = router;
