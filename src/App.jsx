import React, { useEffect, useState } from "react";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import Navbar from "./components/Navbar";


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [completed, setcompleted] = useState([])

  const [activeButton, setActiveButton] = useState("btn-todo");
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleAddBtn = () => {
  if(title===""&&description===""){
    alert("enter something")
  }else{
    let newTodoEntry = {
      title: title,
      description: description,
    };

    let updateArray = [...allTodos];
    
    updateArray.push(newTodoEntry);
    setAllTodos(updateArray);
    localStorage.setItem('todoList', JSON.stringify(updateArray))
    setTitle("");
    setDescription("")
  }
  };

  const handleDelete=(index)=>{
   
   let confirmation=confirm("Are you sure you want to delete this todo?")
   if(confirmation){
      let deletTodo=[...allTodos];
   
    deletTodo.splice(index,1);
    
    
    localStorage.setItem('todoList',JSON.stringify(deletTodo))
    setAllTodos(deletTodo)
   
  }
  }
  const handleCompletedTask=(index)=>{
    let completedTask=[...completed]
    completedTask.push(allTodos[index]);
    
    setcompleted(completedTask)
  localStorage.setItem('completetask',JSON.stringify(completedTask))

let deletTodo=[...allTodos];
   
deletTodo.splice(index,1);

localStorage.setItem('todoList',JSON.stringify(deletTodo))
setAllTodos(deletTodo)

  
    
  }
  const handleCompleteDelete=(index)=>{
    let confirmation=confirm("Are you sure you want to delete this todo?")
    if(confirmation){
   let deleteCompleteTask=[...completed]
   deleteCompleteTask.splice(index,1)
   localStorage.setItem('complete',JSON.stringify(deleteCompleteTask));
   setcompleted(deleteCompleteTask)
  }
  }

  const handleEdit=(index)=>{
        let editTodo=allTodos[index]
        setTitle(editTodo.title)
        setDescription(editTodo.description)
        
        let deletTodo=[...allTodos];
   
        deletTodo.splice(index,1);
        
        localStorage.setItem('todoList',JSON.stringify(deletTodo))
        setAllTodos(deletTodo)
    
  }

      useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todoList'))
    let complete=JSON.parse(localStorage.getItem('complete'))
    if(savedTodo){
    setAllTodos(savedTodo)
    }
    if(complete){
      setcompleted(complete)
    }
      },[])

  return (
    <>
    <Navbar/>
    <div className="main">
      <h2>To-Do List App</h2>

      <div className="container">
        <div className="input-item-card">
          <div className="input-items">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Your Title"
            />
          </div>
          <div className="input-items">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Your Description"
            />
          </div>
          <div className="input-items">
            <button className="btn-add" onClick={handleAddBtn}>
              ADD
            </button>
          </div>
        </div>

        <div className="btn-area">
          {/* ToDo button */}
          <button
            className="btn-todo"
            onClick={() => handleButtonClick("btn-todo")}
            style={{
              backgroundColor: activeButton === "btn-todo" ? "#00dfc4" : "gray",
            }}
          >
            
            To Do
          </button>
          {/* completed button */}
          <button
            className="btn-completed"
            onClick={() => handleButtonClick("btn-completed")}
            style={{
              backgroundColor:
                activeButton === "btn-completed" ? "#00dfc4" : "gray",
            }}
          >
           
            Completed
          </button>
        </div>
         
{activeButton==="btn-todo"?   <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
                <div className="todo-list-item " key={index}>
              
                <div className="task">
                  <div >
                    <input type="checkbox" className=" check-icon" onClick={()=>handleCompletedTask(index)} />
                  </div>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                </div>
                </div>

                <div>
                <AiTwotoneEdit className="edit-icon" onClick={()=> handleEdit(index)} />
                 
                  <AiFillDelete className=" delete-icon" onClick={()=> handleDelete(index)}/>
                 
                </div>
              </div>
            );
          })}
        </div>:    <div className="todo-list">
          {completed.map((item, index) => {
            return (
                <div className="todo-list-item " key={index}>
              
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiFillDelete className=" delete-icon" onClick={()=> handleCompleteDelete(index)}/>
               
                </div>

              </div>
            );
          })}
        </div>}
         
     
    
      </div>
      </div>
    </>
  );
}

export default App;
