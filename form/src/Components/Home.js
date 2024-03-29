import React, { useState, useEffect, useRef } from "react";
import logo from "./Images/icon.png";
import axios from "axios";

const Home = () => {
  const [description, setDesciption] = useState("");
  const [modifying, setModifying] = useState(false);
  const [modifyingItem, setModifyingItem] = useState("");
  const [id, setId] = useState("");
  const [buttonName, setButtonName] = useState("Add task");
  // const [tasks, setTasks]=useState([])
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) == undefined
      ? []
      : JSON.parse(localStorage.getItem("tasks"))
  );
  const input = useRef();

  useEffect(() => {
    get_tasks();
  }, []);
  const get_tasks = () => {
    axios
      .get("http://localhost:3001/display_tasks")
      .then((users) => setTasks(users.data))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   let tasksArray = JSON.parse(localStorage.getItem("tasks"));
  //   console.log(typeof tasksArray);
  //   setTasks(tasksArray);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const add_item = (e) => {
    // console.log("in add function");
    input.current.value = "";
    get_tasks();

    //duplicate check
    const duplicate = tasks.find((task) => {
      if (task == description) {
        return true;
      }
    });

    if (duplicate) {
      alert("task already exists!");
      return;
    }
    if (description.trim() === "") {
      alert("Input field is empty!");
      return;
    }

    //setting task
    //...task is userd as putting the value of array in other array and keeping
    //the initial index of input

    // setTasks(() => [description, ...tasks]);
    axios
      .post("http://localhost:3001/add_task", {
        email: "nishantsharma7408@gmail.com",
        tasks: description,
      })
      .then((result) => {
        console.log(result);
        // navigate("/");
      })
      .catch((err) => console.log(err));
    get_tasks();
  };
  const modify_init = (item, id) => {
    setButtonName("Modify Task");
    input.current.value = item;
    setModifyingItem(item);
    setModifying(true);
    console.log(id);
    setId(id);
    console.log(item);
  };

  const modify_item = () => {
    console.log(description);
    if (description.trim() === "") {
      alert("Input field is empty!");
      return;
    }
    const duplicate = tasks.find((task) => {
      if (task == description) {
        return true;
      }
    });

    if (duplicate) {
      alert("task already exists!");
      return;
    }

    // let x = tasks.indexOf(modifyingItem);
    // let copytasks = tasks;
    // copytasks[x] = description;
    // setTasks([...copytasks]);
    axios
      .post("http://localhost:3001/modify_item", {
        id: id,
        tasks: description,
      })
      .then((result) => {
        console.log(result);
        // navigate("/");
        get_tasks();
        input.current.value = "";
        setModifying(false);
        setButtonName("Add tasks");
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = async (item) => {
    await axios
      .post("http://localhost:3001/del_item", { _id: item })
      .then((result) => {
        console.log(result);
        console.log(item);
        // navigate("/");
      })
      .catch((err) => console.log(err));
    get_tasks();
    //setTasks((oldTasks)) in this the argument will always taken as tasks above in
    //use state because setTasks is declared as useStatea
    //oldTask.filter is used to take the array element one by one as oldTask
    //and compared it if it is not the item
    // setTasks((oldTasks) => oldTasks.filter((oldTask) => oldTask != item));
  };

  const loadTasks = tasks.map((task) => {
    return (
      <div className="list">
        <div className="row">
          <div className="tick col-md-1 col-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>

          <div className="data col-md-9 col-9">{task.tasks}</div>

          <div
            className="del col-md-1 col-1 "
            onClick={() => deleteItem(task._id)}
          >
            <i className="bi bi-trash"></i>
          </div>

          <div
            className="edit col-md-1 col-1"
            onClick={() => modify_init(task.tasks, task._id)}
          >
            <i className="bi bi-pencil-square"></i>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="navbar">Signed in as :</div>
      <div className="container col-md-8 offset-md-2">
        <div className="title">
          <img src={logo} className="image" />
          TODO LIST
        </div>
        <div className="topbar row">
          <div className="search col-md-9 col-9">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Task"
              ref={input}
              onChange={(e) => {
                setDesciption(e.target.value);
              }}
            />
          </div>

          <div className="topbar-but col-md-3 col-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={modifying ? modify_item : add_item}
            >
              {buttonName}
            </button>
          </div>
        </div>
        {/* <div className="taasks">
          {tasks.length == 0 ? (
            <>No tasks</>
          ) : (
            <div className="list">{loadTasks}</div>
          )}
        </div> */}
        <div className="tasklist">{loadTasks}</div>
        {/* <>nishanr</> */}
      </div>
    </div>
  );
};

export default Home;
