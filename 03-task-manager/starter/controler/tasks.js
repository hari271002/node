const taskSchema = require("../models/dataschema");
const mongoose = require("mongoose");
const asyncWrapper = require("../midddlerware/async");
const { customAPIError } = require("../error/error");

const getAllTasks = asyncWrapper(async (req, res) => {
  task = await taskSchema.find();
  res.status(200).json({ tasks: task });
});

const createTask = asyncWrapper(async (req, res) => {
  task = await taskSchema.create(req.body);
  res.status(201).json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(customAPIError("Invalid Id format....", 404));
  }
  task = await taskSchema.deleteOne({ _id: taskId });
  res.status(200).json("");
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(customAPIError("Invalid Id format...", 404));
  }

  const task = await taskSchema.findByIdAndUpdate(
    taskId,
    { name: body.name, completed: body.completed },
    { new: true, runValidators: true }
  );

  if (!task) {
    return next(customAPIError("No document found to update", 404));
  }

  res.status(200).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return next(customAPIError("Invalid Id format...", 404));
  }
  task = await taskSchema.findOne({ _id: taskId });
  if (!task) {
    return next(customAPIError(`Cannot find record with ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
