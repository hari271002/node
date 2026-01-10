const { asyncHandler } = require("../utils");
const Product = require("../models/Products");
const customError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});
const getAllProducts = asyncHandler(async (req, res, next) => {
  res.send("Get All Products");
});
const getSingleProduct = asyncHandler(async (req, res, next) => {
  res.send("Get Single Product");
});
const updateProduct = asyncHandler(async (req, res, next) => {
  res.send("Product is Update");
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  res.send("Product is Deleted");
});
const uploadImage = asyncHandler(async (req, res, next) => {
  res.send("Image is uploaded");
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
