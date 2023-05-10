const express = require("express");
const categoryController = require("./../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategorybyId)
  .patch(categoryController.editCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRouter;
