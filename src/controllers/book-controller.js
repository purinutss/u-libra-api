const { Book, Category, University, User } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Category }]
    });
    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.bookId
      },
      include: [{ model: University }, { model: Category }]
    });
    res.status(200).json({ book });
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  console.log("request body------------------------>", req.body);
  console.log("request file------------------------>", req.file);
  try {
    const bookCoverUrl = await cloudinary.upload(req.file.path);
    const book = await Book.create({
      title: req.body.title,
      summary: req.body.summary,
      bookCover: bookCoverUrl,
      universityId: req.body.universityId,
      categoryId: req.body.categoryId
    });
    const createBook = await Book.findOne({
      include: [{ model: Category }, { model: University }]
    });
    res.status(201).json({ createBook });
  } catch (err) {
    next(err);
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

exports.updateBook = async (req, res, next) => {
  console.log("sdfsdfsdsadfsdafasdfsd", req.files);
  try {
    const book = await Book.update(req.body, {
      where: {
        id: req.params.bookId
      }
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
