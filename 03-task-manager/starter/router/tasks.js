const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
} = require("../controler/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").patch(updateTask).get(getTask).delete(deleteTask);

module.exports = router;
