const products = require("../models/product");

// const welcomeTask = (req, res) => {
//   res.status(200).json("Welcome Task");
// };

const getAllProducts = async (req, res) => {
  const product = await products.find({});
  res.status(200).json(product);
};

module.exports = { getAllProducts };
