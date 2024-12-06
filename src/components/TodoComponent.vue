<script setup>
import InputWithError from './InputWithError.vue';
import { ref, computed } from 'vue'
import { TodoService } from '../services/TodoService.js'

const todos = ref([{
    user: 'abcd',
    task: 'task123',
    done: false,
    targetDate: '12/12/2024'
}, {
    user: 'abcd',
    task: 'task123',
    done: false,
    targetDate: '12/12/2024'
}])
const newTodo = ref({
    user: '',
    task: '',
    done: false,
    targetDate: ''
})
const editingTodo = ref(null)
const loading = ref(false)
const error = ref(null)
const validationErrors = ref({})

const today = computed(() => new Date().toISOString().split('T')[0])

const fetchTodos = async () => {
    loading.value = true
    try {
        todos.value = await TodoService.getTodos()
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const addTodo = async () => {
    loading.value = true
    try {
        const todoToAdd = { ...newTodo.value }
        const result = await TodoService.addTodo(todoToAdd)
        todos.value.push(result)
        resetForm()
    } catch (err) {
        validationErrors.value = err
    } finally {
        loading.value = false
    }
}

const updateTodo = async () => {
    if (!editingTodo.value) return
    loading.value = true
    try {
        const updatedTodo = { ...editingTodo.value }
        const result = await TodoService.updateTodo(updatedTodo)
        const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
        if (index !== -1) todos.value[index] = result
        editingTodo.value = null // Clear editing state
    } catch (err) {
        validationErrors.value = err
    } finally {
        loading.value = false
    }
}

const deleteTodo = async (id) => {
    loading.value = true
    try {
        await TodoService.deleteTodo(id)
        todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}


const resetForm = () => {
    newTodo.value = {
        user: '',
        task: '',
        done: false,
        targetDate: ''
    }
    validationErrors.value = {}
}

const editTodo = (todo) => {
    editingTodo.value = { ...todo } // Create a copy to avoid direct mutations
}

const cancelEdit = () => {
    editingTodo.value = null
    validationErrors.value = {}
}

fetchTodos()
</script>
<template>
    <section id="todoform">
        <h2>Todo View</h2>
        <div v-if="error" class="errormessage">{{ error }}</div>
        <form v-if="!editingTodo" @submit.prevent="addTodo">
            <fieldset>
                <legend>Add: Todo</legend>
                <InputWithError inputId="Username" label="Username" v-model:task="newTodo.user" v-model:error="validationErrors.user" placeholder="Username" />
                <InputWithError inputId="Task" label="Task" v-model:task="newTodo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
                <InputWithError inputId="Date" label="Date" v-model:task="newTodo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
            </fieldset>
            <fieldset class="grid">
                <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">Add Todo</button>
                <button type="button" @click="resetForm">Reset</button>
            </fieldset>
        </form>
        <form v-else @submit.prevent="updateTodo">
            <fieldset>
                <legend>Edit: Todo</legend>
                <InputWithError inputId="Username" label="Username" v-model:task="editingTodo.user" v-model:error="validationErrors.user" placeholder="Username" />
                <InputWithError inputId="Task" label="Task" v-model:task="editingTodo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
                <InputWithError inputId="Date" label="Date" v-model:task="editingTodo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
            </fieldset>
            <fieldset class="grid">
                <button type="submit" :aria-busy="loading" :disabled="loading">Update Todo</button>
                <button type="button" @click="cancelEdit">Cancel</button>
            </fieldset>
        </form>
    </section>
    <section id="todotable">
        <h2>Todo List</h2>
        <div>
            <table v-if="todos.length">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Task</th>
                        <th>Date</th>
                        <th>Done?</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>{{ todo.user }} </td>
                        <td>{{ todo.task }}</td>
                        <td>{{ todo.targetDate }}</td>
                        <td><input type="checkbox" v-model="todo.done" /></td>
                        <td><button @click="editTodo(todo)">Edit</button></td>
                        <td><button @click="deleteTodo(todo.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<style scoped>
.errormessage {
    color: red;
}
</style>
