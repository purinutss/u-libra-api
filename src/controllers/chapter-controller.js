const { Chapter, Book } = require("../models");

exports.createChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.create({
      title: req.body.title,
      content: req.body.content,
      bookId: req.params.bookId,
    });
    res.status(201).json({ chapter });
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

exports.getTheContentAfterClickChapterId = async (req, res, next) => {
  try {
    const chapterContent = await Chapter.findOne({
      where: {
        bookId: req.params.bookId,
        id: req.params.chapterId,
      },
      include: [{ model: Book }],
    });
    res.status(200).json({ chapterContent });
  } catch (err) {
    next(err);
  }
};
