const express = require("express");
const incomeController = require("./../controllers/incomeController");
const incomeRouter = express.Router();

incomeRouter
  .route("/")
  .get(incomeController.getIncomes)
  .post(incomeController.postIncome);

incomeRouter
  .route("/:id")
  .patch(incomeController.editIncome)
  .delete(incomeController.deleteIncome)
  .get(incomeController.getIncomeById)

  module.exports = incomeRouter;