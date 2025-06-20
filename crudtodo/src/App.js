import React, { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    getTodos().then(res => setTodos(res.data)).catch(err => console.error(err));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const res = await addTodo(input.trim());
      setTodos([...todos, res.data]);
      setInput("");
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditInput(todos[index].task);
  };

  const handleSave = async () => {
    if (!editInput.trim()) return;
    const id = todos[editIndex].id;
    try {
      const res = await updateTodo(id, editInput.trim());
      const updated = [...todos];
      updated[editIndex] = res.data;
      setTodos(updated);
      setEditIndex(null);
      setEditInput("");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditInput("");
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a new to-do"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.task}</span>
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => handleRemove(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
