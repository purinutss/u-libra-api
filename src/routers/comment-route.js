const express = require("express");

const commentController = require("../controllers/comment-controller");

const router = express.Router();

router.post("/:bookId", commentController.createComment);
router.delete("/:commentId", commentController.deleteComment);
router.get("/:bookId/comments", commentController.getAllCommentsInTheBook);
router.patch("/:commentId", commentController.updateComment);

module.exports = router;
