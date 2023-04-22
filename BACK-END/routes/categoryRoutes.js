const express = require("express");
const categoryController = require("./../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.getCategory)

  categoryRouter
  .route("/createCategory")
  .post(categoryController.createCategory)

  module.exports = categoryRouter;