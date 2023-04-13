const mongoose = require("mongoose");
const Income = require("./../models/incomeModel");



exports.getIncomes = (req, res) => {
  Income.find(req.query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.postIncome = (req, res) => {
  let {name, date, amount, category} = req.body
  let income = new Income({
    name: name,
    date: date,
    amount: amount,
    category: category
  })
  income
  .save()
  .then((doc) => {
    res.status(200).json(doc);
  })
};

exports.editIncome = (req, res) => {
  let { id } = req.params;
  Income.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.deleteIncome = (req, res) => {
    let { id } = req.params;
    Income.findByIdAndDelete(id)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => res.status(404).json(doc));
  };
  