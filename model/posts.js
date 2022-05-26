const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String },
  desc: { type: String },
  url: { type: String },
  createdAt: { type: Date },
});

module.exports = mongoose.model("post", postSchema);
