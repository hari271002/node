const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  createProduct,
} = require("../controllers/productController");

router
  .route("/")
  .post(authenticateUser, authorizePermission("admin"), createProduct)
  .get(getAllProducts);
router.route("/uploadImage").post(uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, authorizePermission("admin"), updateProduct)
  .delete(authenticateUser, authorizePermission("admin"), deleteProduct);

module.exports = router;
