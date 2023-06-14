import React, { useState, useEffect } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      if (editIndex === -1) {
        const newTodo = { title, description, completed: false };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].title = title;
        updatedTodos[editIndex].description = description;
        setTodos(updatedTodos);
        setEditIndex(-1);
      }
      setTitle("");
      setDescription("");
    }
  };

  const handleEditTodo = (index) => {
    setTitle(todos[index].title);
    setDescription(todos[index].description);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleToggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
      <button
        className={`toggle-mode ${isDarkMode ? "dark-mode" : ""}`}
        onClick={handleToggleMode}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <button onClick={handleAddTodo}>
          {editIndex === -1 ? "Add Todo" : "Update Todo"}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <div>
              <button onClick={() => handleEditTodo(index)}>
                <RiEdit2Line />
              </button>
              <button onClick={() => handleDeleteTodo(index)}>
                <RiDeleteBinLine />
              </button>
              <button onClick={() => handleToggleComplete(index)}>
                {todo.completed ? <FaCheck /> : <FaCheck />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
