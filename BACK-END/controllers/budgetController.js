const Budget = require("../models/budgetModel");
const mongoose = require('mongoose');

exports.getBudgets = (req, res) => {
    try {
        Budget.find(req.query)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => res.status(404).json({ error: "Bad request query" }));
    } catch {
        res.status(500).json({ error: "Get request failed, please try again" });
    }
};

// exports.getBudgetById = (req, res) => {
//     let { id } = req.params;
//     Budget.findById(id)
//       .then((doc) => {
//         res.status(200).json(doc);
//       })
//       .catch((error) => res.status(404).json(error));
//   };

// exports.getBudgetById = (req, res) => {
//     let { id } = req.params;
//     try {
//       id = mongoose.Types.ObjectId(id);
//     } catch (error) {
//       return res.status(404).json({ message: 'Invalid budget ID' });
//     }
//     Budget.findById(id)
//       .then((doc) => {
//         if (!doc) {
//           return res.status(404).json({ message: 'Budget not found' });
//         }
//         res.status(200).json(doc);
//       })
//       .catch((error) => res.status(500).json(error));
//   };


exports.getBudgetById = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid budget ID' });
  }
  Budget.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: 'Budget not found' });
      }
      res.status(200).json(doc);
    })
    .catch((error) => res.status(500).json(error));
};




// exports.deleteBudget = (req, res) => {
//     let { id } = req.params;
//     Budget.findByIdAndDelete(id)
//     .then((doc) => {
//         res.status(200).json(doc);
//     })
//     .catch((error) => res.status(404).json(error));
// };

exports.editBudget = (req, res) => {
    let { id } = req.params;
    Budget.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

// exports.createBudget = (req, res) => {
//     const { budget } = req.body;

//     try {
//         Budget.findOne({ budget: budget }).then((existingBudget) => {
//             if(existingBudget) {
//                 res.status(422).json({ error: "Budget already exists" });
//             } else {
//                 const createdBudget = new Budget({
//                     budget,
//                 });

//                 createdBudget
//                 .save()
//                 .then((doc) => {
//                     res.status(201).json(doc);
//                 })
//                 .catch((error) => res.status(404).json({ error: error.message }));
//             }
//         });
//     } catch {
//         res.status(500).json({ error: "Creating budget failed, please try again later" })
//     }
// };

exports.createBudget = (req, res) => {
    let { category, limit, id } = req.body;
    let expense = new Budget({
      id: id,
      limit: limit,
      category: category,
    });
    expense.save().then((doc) => {
      res.status(200).json(doc);
    });
  };
  