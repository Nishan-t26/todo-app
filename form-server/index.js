const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FormModel = require("./models/Form");
const TasksModel = require("./models/tasks");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Todo");

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  FormModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("sucess");
      } else {
        res.json("wrong password");
      }
    } else {
      res.json("no record exists");
    }
  });
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  FormModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

//add task
app.post("/add_task", (req, res) => {
  console.log(req.body);
  TasksModel.create(req.body)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

//display
app.get("/display_tasks", (req, res) => {
  console.log(req.body);
  TasksModel.find(req.body)
    .then((name) => res.json(name))
    .catch((err) => res.json(err));
});

//delete
app.post("/del_item", async (req, res) => {
  // const { id } = req.body._id;
  await TasksModel.findByIdAndDelete(req.body._id)
    .then((tasks) => res.json(tasks))
    .catch((err) => {
      res.json(err);
    });
});

//modify
app.post("/modify_item", async (req, res) => {
  // var user_id = req.body.id;
  // User.findByIdAndUpdate(
  //   user_id,
  //   { tasks: req.body.task },
  //   function (err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Updated User : ", docs);
  //     }
  //   }
  // );

  console.log(req.body.id);

  TasksModel.findByIdAndUpdate(req.body.id, { $set: { tasks: req.body.tasks } })
    .then((task) => {
      if (!task) {
        console.log("task not found");
      }
      console.log("modified", task);
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.post("/modify_item", async (req, res) => {
//   await TasksModel.findByIdAndUpdate(
//     req.body._id,
//     { tasks: req.body.tasks },
//     function (err, docs) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Updated User : ", docs);
//       }
//     }
//   );
//   res.send({ success: true, message: "data update successfully" });
// });

//listening port
app.listen(3001, () => {
  console.log("server is running");
});
