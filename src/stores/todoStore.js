import { defineStore } from 'pinia';
import { TodoModel } from "../services/TodoModel";
import { TodoService } from "../services/TodoService";
export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        loading: false,
        error: null,
        validationErrors: {},
    }),
    actions: {
        async fetchTodos() {
            this.loading = true;
            try {
                this.todos = await TodoService.getTodos()
            } catch (err) {
                this.error = 'Failed to fetch todos';
            } finally {
                this.loading = false;
            }
        },
        async addTodo(newTodo) {
            const errors = TodoModel.validate(newTodo);
            if (Object.keys(errors).length > 0) {
                this.validationErrors = errors;
            }

            // Add Service.addTodo()


        },
        async updateTodo(updatedTodo) {
            const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
            if (index !== -1) {
                this.todos[index] = { ...updatedTodo };
            } else {
                this.error = 'Todo not found';
            }

            // Add Service.updateTodo()


        },
        async deleteTodo(id) {
            this.todos = this.todos.filter((todo) => todo.id !== id);

            // Add Service.deleteTodo()
        },
    },
});
