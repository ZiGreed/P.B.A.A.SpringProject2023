const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
    category: {
        type: String
    },
    limit: {
        type: Number,
        required: [true, "limit is required"],
    },
    // id: {
    //     type: Number,
    // }
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;