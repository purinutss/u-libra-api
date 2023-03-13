const { Book, Category, University, User } = require("../models");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Category }],
      order: [["createdAt", "DESC"]]
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
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    let bookCoverUrl;
    if (req.file) {
      bookCoverUrl = await cloudinary.upload(req.file.path);
    }
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
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.updateBook = async (req, res, next) => {
  console.log("------------------------------------->", req.body);
  try {
    let updateBookCoverUrl;
    if (req.file) {
      updateBookCoverUrl = await cloudinary.upload(req.file?.path);
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const book = await Book.update(
      {
        title: req.body.title,
        summary: req.body.summary,
        bookCover: updateBookCoverUrl,
        universityId: req.body.universityId,
        categoryId: req.body.categoryId
      },
      { where: { id: req.params.bookId } }
    );

    res.status(200).json({ book });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Book.destroy({
      where: {
        id: req.params.bookId
      }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
