const { Book, Category, University } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({ include: [{ model: Category }] });
    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.bookId,
      },
      include: [{ model: University }, { model: Category }],
    });
    res.status(200).json({ book });
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const url = await cloudinary.upload(req.file.path);
    // const url = "sfsadfsdjfhakjlghoehg;oerhgo;afs";
    const book = await Book.create({
      title: req.body.title,
      summary: req.body.summary,
      bookCover: url,
      universityId: req.params.universityId,
      categoryId: req.params.categoryId,
    });
    res.status(201).json({ book });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  console.log("sdfsdfsdsadfsdafasdfsd", req.files);
  try {
    const book = await Book.update(req.body, {
      where: {
        id: req.params.bookId,
      },
    });
    res.status(200).json({ book });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.destroy;
  } catch (err) {
    next(err);
  }
};
