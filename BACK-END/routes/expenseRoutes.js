const express = require("express");
const expenseController = require("./../controllers/expenseController");
const expenseRouter = express.Router();
const auth = require("./../middleware/auth")
const loggerMiddleware = require("./../middleware/logger");

expenseRouter
  .route("/")
  .get(auth, expenseController.getExpenses)
  .post(auth, loggerMiddleware, expenseController.postExpense)

expenseRouter
  .route("/:id")
  .patch(auth, loggerMiddleware, expenseController.editExpense)
  .delete(auth, loggerMiddleware, expenseController.deleteExpense)
  .get(auth, expenseController.getExpenseById)

module.exports = expenseRouter;
 