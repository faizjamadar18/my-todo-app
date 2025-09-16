import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("string_of_todos")
    if (todoString) {
      let todo_array = JSON.parse(localStorage.getItem("string_of_todos"))
      settodos(todo_array)
    }
  }, [])



  const handleAdd = (e) => {
    let newtodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]   // This makes a brand new array with all the old todos (...todos), and the new todo object added at the end  with iscompleted= false and a unique id 
    settodos(newtodos)
    settodo("")
    localStorage.setItem("string_of_todos", JSON.stringify(newtodos))  // storing todo in local storage in the form of string 

  }
  const handleEdit = (id) => {
    let newtodo = todos.filter(item => {
      return item.id === id
    })
    settodo(newtodo[0].todo)      // newtodos[0].todo means → get the todo property of that first element.

    // deleting that particular todo from the display it is same as the handleDelete() function 
    let deletetodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(deletetodos)
    localStorage.setItem("string_of_todos", JSON.stringify(deletetodos))
  }
  const handleDelete = (id) => {
    let newtodo = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodo)
    localStorage.setItem("string_of_todos", JSON.stringify(newtodo))
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let newtodos = [...todos]
    let index = newtodos.findIndex(item => {
      return item.id == id
    })
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    localStorage.setItem("string_of_todos", JSON.stringify(newtodos))
  }


  // const arr = [1, 2, 3];
  // const copyArr = arr;  // Now both arr and copyArr point to the same array in memory.

  // const arr = [1, 2, 3];
  // const copyArr = [...arr];   // spread makes a new array

  // finfIndex():
  // const numbers = [10, 20, 30, 40];
  // const index = numbers.findIndex(num => num === 30);
  // console.log(index); // 2  (because 30 is at position 2)

  const handleChange = (e) => {
    settodo(e.target.value)   // jo bhi input ki value hai usko todo me daal do 
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <div className="main w-full h-screen">
      <Navbar />
      <div className="container mx-auto my-10 w-[80%] sm:w-lg h-[85vh] shadow-2xl bg-white relative">
        <header className="sm:text-2xl text-xl font-bold flex justify-center sm:p-5 p-2 break-words text-center " >TaskMate - Smart Way to Manage Todos</header>
        <div className="addtodo flex justify-center gap-0 sm:mx-auto mx-3">
          <input onChange={handleChange} value={todo} placeholder='Add your Todo' className=' border-1 border-black w-[75%] p-2.5' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 1} className="bg-[#8E49E8] text-white text-2xl px-5 py-2 cursor-pointer hover:bg-[#7134c2]  disabled:bg-[#8E49E8] "><FaPlus /></button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} className='ml-5 mr-2 sm:mt-4 mt-2' />Show Finished
        <div className="todos sm:h-[70%] h-[69%] overflow-scroll ">
          {todos.length === 0 && <div className='m-6 flex justify-center text-[#878787]'>No Todos To display</div>}
          {todos.map((item) => {
            if (!showFinished && item.isCompleted) {
              // Don't show this todo (because it's completed and we don't want finished todos)
              return null;
            }
            return <div key={item.id} className="todo flex justify-between items-center mx-4 mb-4 mt-2 p-2 bg-[#edeaea]">
              <input type="checkbox" className=' hover:cursor-pointer' name={item.id} checked={item.isCompleted} onChange={handleCheckbox} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex gap-2">

                <button onClick={() => handleEdit(item.id)} className='sm:py-2 sm:px-5 px-3 py-1 bg-[#e74c3c] text-2xl text-white hover:cursor-pointer hover:bg-[#c13e2f] ' ><FaEdit /></button>

                <button onClick={() => { handleDelete(item.id) }} className='sm:py-2 sm:px-4 px-2 py-1 bg-[#e74c3c] text-2xl text-white hover:cursor-pointer  hover:bg-[#c13e2f]'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
