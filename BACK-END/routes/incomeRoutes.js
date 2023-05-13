const express = require("express");
const incomeController = require("./../controllers/incomeController");
const incomeRouter = express.Router();
const auth = require("./../middleware/auth")
const loggerMiddleware = require("./../middleware/logger");

incomeRouter
  .route("/")
  .get(auth, incomeController.getIncomes)
  .post(auth, loggerMiddleware, incomeController.postIncome);

incomeRouter
  .route("/:id")
  .patch(auth, loggerMiddleware, incomeController.editIncome)
  .delete(auth, loggerMiddleware, incomeController.deleteIncome)
  .get(auth, incomeController.getIncomeById)

  module.exports = incomeRouter;