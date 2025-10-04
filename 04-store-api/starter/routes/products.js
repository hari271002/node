const express = require("express");
const router = express.Router();

const { welcomeTask } = require("../controllers/products");

router.route("/").get(welcomeTask);

module.exports = router;
