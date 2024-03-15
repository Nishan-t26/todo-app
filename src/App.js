import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [description, setDesciption] = useState("");
  const [modifying, setModifying] = useState(false);
  const [modifyingItem, setModifyingItem] = useState("");
  const [buttonName, setButtonName] = useState("Add task");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) == undefined
      ? []
      : JSON.parse(localStorage.getItem("tasks"))
  );
  const input = useRef();

  useEffect(() => {
    let tasksArray = JSON.parse(localStorage.getItem("tasks"));
    console.log(typeof tasksArray);
    setTasks(tasksArray);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const add_item = (e) => {
    input.current.value = "";

    //duplicate check
    const duplicate = tasks.find((task) => {
      if (task == input) {
        return true;
      }
    });

    if (duplicate) {
      alert("task already exists!");
      return;
    }

    //setting task
    //...task is userd as putting the value of array in other array and keeping
    //the initial index of input
    setTasks(() => [input, ...tasks]);
  };

  const deleteItem = (item) => {
    //setTasks((oldTasks)) in this the argument will always taken as tasks above in
    //use state because setTasks is declared as useStatea
    //oldTask.filter is used to take the array element one by one as oldTask
    //and compared it if it is not the item
    setTasks((oldTasks) => oldTasks.filter((oldTask) => oldTask != item));
  };
  const modify_init = (item) => {
    setButtonName("Modify Task");
    input.current.value = item;
    setModifyingItem(item);
    setModifying(true);
  };

  const modifyitem = (item) => {
    let x = tasks.indexOf(modifyingItem);
    let copytasks = tasks;
    copytasks[x] = description;
    setTasks([...copytasks]);

    input.current.value = "";
    setModifying(false);
    setButtonName("Add tasks");
  };

  const loadtasks = tasks.map((task) => {
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

          <div className="data col-md-9 col-9">{task}</div>

          <div className="del col-md-1 col-1 " onClick={() => deleteItem(task)}>
            <i className="bi bi-trash"></i>
          </div>

          <div
            className="edit col-md-1 col-1"
            onClick={() => modifyingItem(task)}
          >
            <i className="bi bi-pencil-square"></i>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="main">
      <div className="container col-md-8 offset-md-2">
        <div className="title">TODO LIST</div>

        <div className="navbar">
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

          <div className="navbar-but col-md-3 col-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={modifying ? modifyitem : add_item}
            >
              {buttonName}
            </button>
          </div>
        </div>
        <div>
          {tasks.length == 0 ? <></> : <div className="list">{loadtasks}</div>}
        </div>

        {/* <div className="list">
          <div className="row">
            <div className="tick col-md-1 col-1">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>

            <div className="data col-md-9 col-9">Create react app</div>

            <div className="del col-md-1 col-1">
              <i className="bi bi-trash"></i>
            </div>

            <div className="edit col-md-1 col-1">
              <i className="bi bi-pencil-square"></i>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;

{
  /* <div className='container'>
<div className='container-navbar'>
  <b>TO-DO</b>
</div>
  <div className='container-topbar'>
    <div className='container-topbar-row row'>
      <div className='add-item col-4'>
        <button type="button" className="btn btn-primary" onClick={add_item}>Add task</button>
      </div>
      <div className='col-6'></div>
      <div className="dropdown col-2">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          All
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Pending</a></li>
          <li><a className="dropdown-item" href="#">completed</a></li>
          <li><a className="dropdown-item" href="#">All</a></li>
        </ul>
    </div>  
  </div>
  <div className='container-list'>
      <div className='container-list-a row'>
        <div className='checkBox col-1'>
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
        </div>
        <div className='task col-9'>
          create a react app
        </div>
        <div className='deleteIcon col-1'>
          <i className="bi bi-trash3" onClick={Delete}></i>
        </div>
        <div className='edit col-1'>
          <i className="bi bi-pencil-square" onClick={Modify}></i>
        </div> 
      </div>

      <div className='container-list-a row'>
        <div className='checkBox col-1'>
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
        </div>
        <div className='task col-9'>
          gym 6'o clock
        </div>
        <div className='deleteIcon col-1'>
          <i className="bi bi-trash3" onClick={Delete}></i>
        </div>
        <div className='edit col-1'>
          <i className="bi bi-pencil-square" onClick={Modify}></i>
        </div> 
      </div>

      <div className='container-list-a row'>
        <div className='checkBox col-1'>
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
        </div>
        <div className='task col-9'>
          shopping
        </div>
        <div className='deleteIcon col-1'>
          <i className="bi bi-trash3 onClick={Delete}"></i>
        </div>
        <div className='edit col-1'>
          <i className="bi bi-pencil-square" onClick={Modify}></i>
        </div> 
      </div>

      <div className='container-list-a row'>
        <div className='checkBox col-1'>
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
        </div>
        <div className='task col-9'>
          task done
        </div>
        <div className='deleteIcon col-1'>
          <i className="bi bi-trash3"></i>
        </div>
        <div className='edit col-1'>
          <i className="bi bi-pencil-square" onClick={Modify}></i>
        </div> 
      </div>


    </div>

</div>
</div> */
}
