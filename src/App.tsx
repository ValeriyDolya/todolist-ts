import React, {ChangeEvent, useState} from 'react';

import './App.css';
import {TasksType, Todolist} from './Todolist'
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "completed" | "active";
type todoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  


  // const [tasks, setTasks] = useState([
  //   {id:v1(), title: "HTML/CSS", isDone: true},
  //   {id:v1(), title: "JS", isDone: true},
  //   {id:v1(), title: "React", isDone: false},
  //   {id:v1(), title: "Terminator", isDone: true},
  //   {id:v1(), title: "XXX", isDone: false},
  //   {id:v1(), title: "Fly", isDone: true},
  //   {id:v1(), title: "Gentlmen of luck", isDone: true}
  // ])
  // const [filter, setFilter] = useState<FilterValuesType>("all")


  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredArr = tasks.filter(i => i.id !== id)
    tasksObj[todoListId] = filteredArr;
    setTasks({...tasksObj});   
  }
  function addTask(title: string, todoListId: string) {
    let task = {id: v1(), title, isDone: false};
    let tasks = tasksObj[todoListId]
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj});
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
    
  }



  function fiterTasks (value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists])
    } 

  }
  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks(tasksObj);
  }
  //----------------------------------------------------------------
  let todoListId1 = v1();
  let todoListId2 = v1();
  let todoListId3 = v1();

  let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"},
    {id: todoListId3, title: "What to sell", filter: "all"},
  ])



  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      {id:v1(), title: "HTML/CSS", isDone: true},
      {id:v1(), title: "JS", isDone: true},
      {id:v1(), title: "React", isDone: false},
      {id:v1(), title: "Terminator", isDone: true},
      {id:v1(), title: "XXX", isDone: false},
      {id:v1(), title: "Fly", isDone: true},
      {id:v1(), title: "Gentlmen of luck", isDone: true}
    ],
    [todoListId2]: [
      {id:v1(), title: "milk", isDone: true},
      {id:v1(), title: "bread", isDone: true},
      {id:v1(), title: "fruites", isDone: false},

    ],
    [todoListId3]: [
      {id:v1(), title: "bike", isDone: true},
      {id:v1(), title: "bread", isDone: true},
      {id:v1(), title: "fruites", isDone: false},

    ]
  })

//--------------------- new list -------------------------------------
let [inputShow, setInputShow] = useState(true)



//-----------------------------------------------------------------------
  return (
    <div className="App" >
      <h1>Todo List</h1>
      <button className='newTasksListBtn'
      onClick={() => setInputShow(true)}
      >New Tasks List</button>
      {inputShow && <div className='addListTitleContainer'>
        <p>Title of Tasks List</p>
        <input type="text"
          
           
        />
        <button>+</button>
        <button onClick={() => setInputShow(false)}>x</button>
      </div>}
      <div className='todoListContainer'>
      {
        todoLists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
          }
          return       <Todolist
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={tasksForTodoList}
          removeTask={removeTask}
          fiterTasks={fiterTasks}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={tl.filter}
          removeTodoList={removeTodoList}
        />
        })
      }
      </div>

    


    </div>
  );
}



export default App;




