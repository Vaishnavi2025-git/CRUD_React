// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:9045/api/todos";

export const getTodos = () => axios.get(BASE_URL);
export const addTodo = (task) => axios.post(`${BASE_URL}/post`, { task });
export const updateTodo = (id, task) => axios.put(`${BASE_URL}/${id}`, { task });
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/${id}`);
