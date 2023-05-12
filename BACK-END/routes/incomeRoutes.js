const express = require("express");
const incomeController = require("./../controllers/incomeController");
const incomeRouter = express.Router();
const auth = require("./../middleware/auth")

incomeRouter
  .route("/")
  .get(auth, incomeController.getIncomes)
  .post(auth, incomeController.postIncome);

incomeRouter
  .route("/:id")
  .patch(auth, incomeController.editIncome)
  .delete(auth, incomeController.deleteIncome)
  .get(auth, incomeController.getIncomeById)

  module.exports = incomeRouter;