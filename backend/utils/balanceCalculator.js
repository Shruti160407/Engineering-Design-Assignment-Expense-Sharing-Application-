exports.calculateBalances = (group, expense) => {
  const total = expense.amount;
  const payer = expense.paidBy;

  if (!group.balances) {
    group.balances = {};
  }

  // Add money to payer
  group.balances[payer] = (group.balances[payer] || 0) + total;

  // Subtract each user's share
  expense.splits.forEach(split => {
    group.balances[split.user] =
      (group.balances[split.user] || 0) - split.value;
  });

  return group;
};

