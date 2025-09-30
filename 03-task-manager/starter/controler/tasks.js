const getAllTasks = (req, res) => {
  res.send("All items from controller");
};

const createTask = (req, res) => {
  res.send("Create Task");
};

const deleteTask = (req, res) => {
  res.send("Delete Task");
};

const updateTask = (req, res) => {
  res.send("Update Task");
};

const getTask = (req, res) => {
  res.send("Get a single Task");
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
