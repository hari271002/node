const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});

module.exports = mongoose.model("Product", product);
