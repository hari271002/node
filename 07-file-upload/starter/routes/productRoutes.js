const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProdcucts,
} = require("../controllers/productController");
const { uploadImage } = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProdcucts);
router.route("/upload").post(uploadImage);

module.exports = router;
