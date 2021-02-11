const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  username: { type: String, required: true },
  commentText: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reaction: { type: { any: [String] } }, //string = username,
  edited: { type: Boolean, default: false }, ////update the date
  deleted: { type: Boolean, default: false },
});

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  previewImage: {
    type: String,
    default:
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
  },
  date: { type: Date, default: Date.now },
  userID: { type: String, default: "usermodel" },
  category: {
    type: [String],
    enum: ["frontend", "backend", "database", "general"],
    required: true,
  },
  rating: { type: Number, min: 0, max: 5 },
  num_ratings: { type: Number },
  num_views: { type: Number },
  paid: { type: String, enum: ["paid", "free"], required: true },
  format: {
    type: String,
    enum: ["documentation", "course"],
  }, // VIRTUAL → EMPTY AT BEGIN
  description: { type: String, required: true },
  edited: { type: Boolean, default: false }, //update the date
  deleted: { type: Boolean, default: false },
  comments: [Comment],
});

module.exports = mongoose.model("resource", ResourceSchema);