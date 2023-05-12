const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
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

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
