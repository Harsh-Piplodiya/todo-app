import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/Index'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  // add task function
  const addTodo = (todo) => {
    // to add a new todo,  we need to create a new arr coz if we directly added new todo to the old arr, 
    // it would've overwritten the entire arr, so to not do so we create a copy of the old arr with the new todo.
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    // this will store all the todos except for the one that matches with the Id of the todo we wanna delete
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // toggle function for the completion of the task
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  // loacl-storage fucntionality of web browser
  // to access the local-storage it has 2 methods 'getItem' and 'setItem'

  // if we reopen our page, we need to be able to see our already created 'todos' for that,
  // we will 'useEffect' to laod our old 'todos' in our todo app
  useEffect(() => {
    
    // using the loaclstorage.getItem("key_name") we can access and get the items stored in local storage
    // items are stored in 'String' form so in order to maintian the structure we need to convert it into JSON using JSON.parse and vice-versa
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  // this useEffect is to store the items into the local-storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
