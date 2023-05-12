const express = require("express");
const expenseController = require("./../controllers/expenseController");
const expenseRouter = express.Router();
const auth = require("./../middleware/auth")

expenseRouter
  .route("/")
  .get(auth, expenseController.getExpenses)
  .post(auth, expenseController.postExpense)

expenseRouter
  .route("/:id")
  .patch(auth, expenseController.editExpense)
  .delete(auth, expenseController.deleteExpense)
  .get(auth, expenseController.getExpenseById)

  module.exports = expenseRouter;