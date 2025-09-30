const express = require("express");
const router = express.Router();

const getAllTasks = require("../controler/tasks").getAllTasks;

router.get("/", getAllTasks);

module.exports = router;
