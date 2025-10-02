const taskSchema = require("../models/dataschema");
const mongoose = require("mongoose");

const getAllTasks = async (req, res) => {
  try {
    task = await taskSchema.find();
    res.status(200).json({ tasks: task });
  } catch (err) {
    res.status(400).json(err);
  }
};

const createTask = async (req, res) => {
  try {
    task = await taskSchema.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    //console.log(req.body);
    const { id: taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(401).json({ msg: "Invalid task ID format" });
    }
    task = await taskSchema.deleteOne({ _id: taskId });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ msg: "Invalid task ID format" });
    }

    const task = await taskSchema.findByIdAndUpdate(
      taskId,
      { name: body.name },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "No document found to update" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(401).json({ msg: "Invalid task ID format" });
    }
    task = await taskSchema.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `cannot find records with ${taskId}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
