const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Prodct description is required"],
      maxlength: [
        1000,
        "Product description cannot be more than 100 characters",
      ],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Prodct category is required"],
      enum: {
        values: ["office", "kitchen", "bedroom"],
        message: "{VALUE} is not supported",
      },
    },
    company: {
      type: String,
      required: [true, "Prodct company is required"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colours: {
      type: [String],
      required: [true, "Prodct colour is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductModel);
