import React, { useRef, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const [description, setDesciption] = useState('')
  const [modifying, setModifying] = useState(false)
  const [modifyingItem, setModifyingItem] = useState('')
  const [buttonName, setButtonName] = useState('Add task')
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) == undefined
      ? []
      : JSON.parse(localStorage.getItem('tasks'))
  )
  const input = useRef()

  useEffect(() => {
    let tasksArray = JSON.parse(localStorage.getItem('tasks'))
    console.log(typeof tasksArray)
    setTasks(tasksArray)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const add_item = (e) => {
    console.log('add button clicked...')
    input.current.value = ''

    //duplicate check
    console.log('checking duplicate...')
    const duplicate = tasks.find((task) => {
      if (task == description) {
        console.log('duplicate task found!')
        return true
      }
    })

    if (duplicate) {
      alert('Task already exists!')
      return
    }

    console.log('duplicate not found...updating array')

    //setting task
    //...task is userd as putting the value of array in other array and keeping
    //the initial index of input
    setTasks(() => [description, ...tasks])
  }

  const deleteItem = (item) => {
    //setTasks((oldTasks)) in this the argument will always taken as tasks above in
    //use state because setTasks is declared as useStatea
    //oldTask.filter is used to take the array element one by one as oldTask
    //and compared it if it is not the item
    setTasks((oldTasks) => oldTasks.filter((oldTask) => oldTask != item))
  }
  const modify_init = (item) => {
    setButtonName('Modify Task')
    input.current.value = item
    setModifyingItem(item)
    setModifying(true)
  }

  const modifyitem = (item) => {
    let x = tasks.indexOf(modifyingItem)
    let copytasks = tasks
    copytasks[x] = description
    setTasks([...copytasks])

    input.current.value = ''
    setModifying(false)
    setButtonName('Add tasks')
  }

  const loadtasks = tasks.map((task) => {
    return (
      <div className='list'>
        <div className='row'>
          <div className='tick col-md-1 col-1'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='flexCheckDefault'
            />
          </div>

          <div className='data col-md-9 col-9'>{task}</div>

          <div className='del col-md-1 col-1 ' onClick={() => deleteItem(task)}>
            <i className='bi bi-trash'></i>
          </div>

          <div
            className='edit col-md-1 col-1'
            onClick={() => modify_init(task)}
          >
            <i className='bi bi-pencil-square'></i>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className='main'>
      <div className='container col-md-8 offset-md-2'>
        <div className='title'>TODO LIST</div>

        <div className='navbar'>
          <div className='search col-md-9 col-9'>
            <input
              type='email'
              className='form-control'
              placeholder='Task'
              ref={input}
              onChange={(e) => {
                setDesciption(e.target.value)
              }}
            />
          </div>
          <div className='navbar-but col-md-3 col-3'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={modifying ? modifyitem : add_item}
            >
              {buttonName}
            </button>
          </div>
        </div>
        <div>
          {tasks.length == 0 ? <></> : <div className='list'>{loadtasks}</div>}
        </div>
      </div>
    </div>
  )
}

export default App
