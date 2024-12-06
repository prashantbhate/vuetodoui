<script setup>

import { useTodoStore } from '../stores/todoStore';
import TodoForm from './TodoForm.vue';
import { ref } from 'vue'
import TodoTable from './TodoTable.vue';


const todoStore = useTodoStore();

const newTodo = ref({
    user: '',
    task: '',
    done: false,
    targetDate: ''
})
const editingTodo = ref(null)

const fetchTodos = async () => {
    await todoStore.fetchTodos()
}

const addTodo = async () => {
    console.log("Adding newTodo", newTodo.value)
    await todoStore.addTodo(newTodo.value);
    resetForm()
}
const updateTodo = async () => {
    console.log("updating editingTodo", editingTodo.value)
    await todoStore.updateTodo(editingTodo.value);
    cancelEdit()
}
const deleteTodo = async (id) => {
    console.log("deleting id", id)
    await todoStore.deleteTodo(id);
    cancelEdit()
}
const resetForm = () => {
    newTodo.value = {
        user: '',
        task: '',
        done: false,
        targetDate: ''
    }
    todoStore.validationErrors = {}
}
const editTodo = (id) => {
    console.log("edit id", id)
    const todo = todoStore.todos.find((t) => t.id === id);
    if (todo) {
        editingTodo.value = { ...todo }; // Create a copy
    }
}

const cancelEdit = () => {
    editingTodo.value = null
    todoStore.validationErrors = {}
}

fetchTodos()
</script>
<template>
    <section id="todoform">
        <h2>Todo View</h2>
        <div v-if="todoStore.error" class="errormessage">{{ todoStore.error }}</div>
        <TodoForm v-if="!editingTodo" :loading="todoStore.loading" v-model:todo="newTodo" v-model:validationErrors="todoStore.validationErrors" form-label="Add: Todo" submit-label="Add Todo" reset-label="Reset" @submit="addTodo" @reset="resetForm" />
        <TodoForm v-else :todoStore.loading="todoStore.loading" v-model:todo="editingTodo" v-model:validationErrors="todoStore.validationErrors" form-label="Edit: Todo" submit-label="Update Todo" reset-label="Cancel" @submit="updateTodo" @reset="cancelEdit" />
    </section>
    <section id="todotable">
        <h2>Todo List</h2>
        <div>
            <TodoTable :loading="todoStore.loading" :todos="todoStore.todos" @edit-click="editTodo" @remove-click="deleteTodo" />
        </div>
    </section>
</template>
<style scoped>
.errormessage {
    color: red;
}
</style>
