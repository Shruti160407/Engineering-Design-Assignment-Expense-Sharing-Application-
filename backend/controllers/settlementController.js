const Group = require("../models/Group");

exports.settleUp = async (req, res) => {
  const { groupId, from, to, amount } = req.body;
  const group = await Group.findById(groupId);

  group.balances[from] += amount;
  group.balances[to] -= amount;

  await group.save();
  res.json(group);
};
