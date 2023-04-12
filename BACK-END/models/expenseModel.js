const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  date: Date,
  amount: Number,
  category: {
    type: String
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
