const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please Provide the rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please Provide the review title"],
    },
    comment: {
      type: String,
      required: [true, "Please Provide the review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
