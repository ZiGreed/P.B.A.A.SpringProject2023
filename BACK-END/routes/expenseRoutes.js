const express = require("express");
const expenseController = require("./../controllers/expenseController");
const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .get(expenseController.getExpenses)
  .post(expenseController.postExpense)

expenseRouter
  .route("/:id")
  .patch(expenseController.editExpense)
  .delete(expenseController.deleteExpense)
  .get(expenseController.getExpenseById)

  module.exports = expenseRouter;