const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  members: [String],
  balances: { type: Object, default: {} }
});

module.exports = mongoose.model("Group", groupSchema);
