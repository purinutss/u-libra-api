const { Chapter } = require("../models");

exports.createChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.create({
      title: req.body.title,
      content: req.body.content,
      bookId: req.params.bookId,
    });
    res.status(201).json(chapter);
  } catch (error) {
    next(error);
  }
};

exports.getChapterAllInTheBook = async (req, res, next) => {
  try {
    const chapters = await Chapter.findAll({
      where: {
        bookId: req.params.bookId,
      },
    });
    res.status(200).json({ chapters });
  } catch (error) {
    next(error);
  }
};
