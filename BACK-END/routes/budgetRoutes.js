const express = require("express");
const budgetController = require("./../controllers/budgetController");
const budgetRouter = express.Router();

budgetRouter
.route("/")
.get(budgetController.getBudgets)
.post(budgetController.postBudget)

budgetRouter
.route("/:id")
.patch(budgetController.editBudget)
.delete(budgetController.deleteBudget)
.get(budgetController.getBudgetById)

module.exports = budgetRouter;