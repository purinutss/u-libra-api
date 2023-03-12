const { Category, Book } = require("../models");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId },
      include: { model: Book }
    });
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ include: { model: Book } });
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};
