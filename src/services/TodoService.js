import axios from "axios";
import { TodoModel } from "./TodoModel";
import { useUserStore } from "@/stores/userStore";

const API_BASE_URL = "http://localhost:8080/todos";

export const TodoService = {
  async getTodos() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch todos");
    }
  },

  async addTodo(todo) {
    const validationErrors = TodoModel.validate(todo);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    const userStore = useUserStore();
    todo.user = userStore.username

    try {
      const response = await axios.post(API_BASE_URL, todo);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add todo");
    }
  },

  async updateTodo(todo) {
    const validationErrors = TodoModel.validate(todo);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
    const userStore = useUserStore();
    todo.user = userStore.username
    try {
      const response = await axios.put(`${API_BASE_URL}/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update todo");
    }
  },

  async deleteTodo(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete todo");
    }
  },
}