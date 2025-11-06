const product = require("../models/product");
const products = require("../models/product");

// const welcomeTask = (req, res) => {
//   res.status(200).json("Welcome Task");
// };

const getAllProducts = async (req, res) => {
  const { required, name, sort } = req.query;
  const queryObject = {};
  if (required) {
    queryObject.required = required === true ? true : false;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = products.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  let product = await result;
  res.status(200).json(product);
};

module.exports = { getAllProducts };
