const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: String,
  description: String,
  amount: Number,
  paidBy: String,

  splitType: {
    type: String,
    enum: ["EQUAL", "EXACT", "PERCENT"]
  },

  splits: [
    {
      user: String,
      value: Number
    }
  ],

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
