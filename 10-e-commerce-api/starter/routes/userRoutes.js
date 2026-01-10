const express = require("express");
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");
const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authorizePermission("admin"), getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/UpdateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getOneUser);

module.exports = router;
