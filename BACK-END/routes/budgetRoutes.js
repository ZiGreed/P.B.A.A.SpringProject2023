const express = require("express");
const budgetController = require("./../controllers/budgetController");
const budgetRouter = express.Router();
const auth = require("./../middleware/auth");
const loggerMiddleware = require("./../middleware/logger");

budgetRouter
  .route("/")
  .get(auth, budgetController.getBudgets)
  .post(auth, budgetController.createBudget);

budgetRouter
  .route("/:id")
  .patch(auth, budgetController.editBudget)
  .delete(auth, budgetController.deleteBudget)
  .get(auth, budgetController.getBudgetById);

module.exports = budgetRouter;
