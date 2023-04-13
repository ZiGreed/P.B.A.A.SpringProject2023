const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
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

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
