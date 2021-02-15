const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  previewImage: {
    type: String,
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
  // comments: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users",
  //     },
  //     text: {
  //       type: String,
  //       required: true,
  //     },
  //     edited: {
  //       type: Boolean,
  //       default: false,
  //     }, ////update the date
  //     deleted: { type: Boolean, default: false },
  //     likes: [
  //       {
  //         user: {
  //           type: Schema.Types.ObjectId,
  //           ref: "users",
  //         },
  //       },
  //     ],
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
});

module.exports = mongoose.model("resource", ResourceSchema);
