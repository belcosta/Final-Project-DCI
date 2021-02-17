const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  resource: {
    type: Schema.Types.ObjectId,
    ref: "resources",
  },
  text: { type: String, required: true },
});

module.exports = mongoose.model("comment", Comment);
