const express = require("express");
const bookController = require("./../controllers/bookController");
const bookRouter = express.Router();

// bookRouter
// .route("/")
// .get(bookController.getBooks)
// .post(bookController.postBook);

// bookRouter
// .route("/:id")
// .get(bookController.getBookByID)
// .patch(bookController.editBook)
// .delete(bookController.deleteBook)

module.exports = bookRouter;