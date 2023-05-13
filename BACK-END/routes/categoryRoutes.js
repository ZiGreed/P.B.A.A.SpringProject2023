const express = require("express");
const categoryController = require("./../controllers/categoryController");
const loggerMiddleware = require("./../middleware/logger");
const categoryRouter = express.Router();
const auth = require("./../middleware/auth")

categoryRouter
  .route("/")
  .get(categoryController.getCategory)
  .post(auth, loggerMiddleware, categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategorybyId)
  .patch(auth, loggerMiddleware, categoryController.editCategory)
  .delete(auth, loggerMiddleware, categoryController.deleteCategory);

module.exports = categoryRouter;
