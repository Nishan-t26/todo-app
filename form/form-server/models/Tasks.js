const mongoose = require("mongoose");
const TasksSchema = new mongoose.Schema({
  //   name: { type: String, required: true },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  tasks: { type: String, required: true },
});

const TasksModel = mongoose.model("tasks", TasksSchema);

module.exports = TasksModel;
