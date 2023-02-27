const express = require("express");

const bookController = require("../controllers/book-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/get/:bookId", bookController.getBookById);
router.post("/post/create-book", upload.single("bookCover"), bookController.createBook);
router.delete("/delete/:bookId", bookController.deleteBook);
router.patch("/update/:bookId", bookController.updateBook);

module.exports = router;
