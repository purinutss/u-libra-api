const { Comment, User } = require("../models");

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      detail: req.body.detail,
      bookId: req.params.bookId,
      userId: req.user.id
    });
    const response = await Comment.findOne({
      where: {
        userId: req.user.id
      },
      include: [{ model: User }],
      order: [["createdAt", "DESC"]]
    });
    res.status(201).json({ response });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.commentId,
        userId: req.user.id
      }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.getAllCommentsInTheBook = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        bookId: req.params.bookId
      },
      include: [{ model: User }]
    });
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.update(
      {
        detail: req.body.detail
      },
      {
        where: {
          id: req.params.commentId,
          userId: req.user.id
        }
      }
    );
    res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};
