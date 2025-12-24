const Expense = require("../models/Expense");
const Group = require("../models/Group");
const { calculateBalances } = require("../utils/balanceCalculator");

exports.addExpense = async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();

  const group = await Group.findById(req.body.groupId);
  calculateBalances(group, expense);
  await group.save();

  res.json(expense);
};

exports.getExpensesByGroup = async (req, res) => {
  const expenses = await Expense.find({ groupId: req.params.groupId });
  res.json(expenses);
};
