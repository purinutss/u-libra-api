const express = require("express");

const chapterController = require("../controllers/chapter-controller");

const router = express.Router();

router.post("/create/chapter/:bookId", chapterController.createChapter);
router.get("/get/chapter/:bookId", chapterController.getChapterAllInTheBook);

module.exports = router;
