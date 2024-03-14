import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


const add_item  =() =>{

}

const Delete  =() =>{

}
const Modify  =() =>{

}


function App() {
  return (
    <div className='container'>
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
    </div>
  );
}

export default App;