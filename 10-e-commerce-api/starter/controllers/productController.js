const { asyncHandler } = require("../utils");
const Product = require("../models/Products");
const customError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { populate } = require("../models/Users");

const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
});
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.find({ _id: productId }).populate({
    path: "review",
    populate: { path: "user", select: "name email" },
  });
  if (!product) {
    throw new customError.NotFoundError("No product with given id");
  }
  res.status(StatusCodes.OK).json({ product });
});
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new customError.NotFoundError("No product with given id");
  }
  res.status(StatusCodes.OK).json({ product });
});
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findById({ _id: productId });
  if (!product) {
    throw new customError.NotFoundError("No product with given id");
  }
  await product.deleteOne();
  res.status(StatusCodes.OK).json({});
});
const uploadImage = asyncHandler(async (req, res, next) => {
  const productImage = req.files.image;
  if (!productImage) {
    throw new customError.BadRequestError("Image file cannot be empty");
  }
  if (productImage.size > 1024 * 1024) {
    throw new customError.BadRequestError(
      "The Image file cannot be more than 1MB",
    );
  }
  if (!productImage.mimetype.startsWith("image/jpeg")) {
    throw new customError.BadRequestError("The image file shoule be jpeg");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`,
  );
  console.log(imagePath);
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
});

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
