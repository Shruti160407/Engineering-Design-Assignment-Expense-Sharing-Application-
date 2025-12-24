const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  const group = new Group({
    name: req.body.name,
    members: req.body.members,
    balances: {}
  });
  await group.save();
  res.json(group);
};

exports.getGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.json(group);
};
