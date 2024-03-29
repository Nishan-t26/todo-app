const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
});

const FormModel = mongoose.model("user", FormSchema);

module.exports = FormModel;
