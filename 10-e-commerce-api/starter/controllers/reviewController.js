const { asyncHandler, checkPermissions } = require("../utils");
const customError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/Users");
const Product = require("../models/Products");
const Review = require("../models/Review");

const createReview = asyncHandler(async (req, res, next) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new customError.BadRequestError(
      `There is no product with id : ${productId}`,
    );
  }
  const alreadyExistingReview = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadyExistingReview) {
    throw new customError.BadRequestError(
      "Already submitted review for this product",
    );
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
});

const getAllReviews = asyncHandler(async (req, res, next) => {
  const products = await Review.find({}).populate({
    path: "product",
    select: "name price company",
  });
  res.status(StatusCodes.OK).json({ products, count: products.length });
});
const getSingleReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById({ _id: reviewId });
  if (!review) {
    throw new customError.BadRequestError(
      `There is no product with the given id ${reviewId}`,
    );
  }
  res.status(StatusCodes.OK).json({ review });
});
const updateReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;
  console.log(req.params);
  const { rating, comment, title } = req.body;
  const review = await Review.findById({ _id: reviewId });
  if (!review) {
    throw new customError.BadRequestError(
      `There is no product with the given id ${reviewId}`,
    );
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.comment = comment;
  review.title = title;
  review.save();
  res.status(StatusCodes.OK).json({ message: "Review is updated" });
});
const deleteReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById({ _id: reviewId });
  if (!review) {
    throw new customError.BadRequestError(
      `There is no product with the given id ${reviewId}`,
    );
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({});
});

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
