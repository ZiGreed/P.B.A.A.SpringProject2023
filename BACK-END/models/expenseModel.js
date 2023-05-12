const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  date: String,
  amount: Number,
  category: {
    type: String
  },
  userID: String
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
