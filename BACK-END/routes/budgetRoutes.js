const express = require("express");
const budgetController = require("./../controllers/budgetController");
const budgetRouter = express.Router();
const auth = require("./../middleware/auth")

budgetRouter
.route("/")
.get(auth, budgetController.getBudgets)
.post(auth, budgetController.createBudget)

budgetRouter
.route("/:id")
.patch(budgetController.editBudget)
.delete(budgetController.deleteBudget)
.get(budgetController.getBudgetById)

module.exports = budgetRouter;