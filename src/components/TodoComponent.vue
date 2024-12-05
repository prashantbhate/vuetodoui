<script setup>
import TodoForm from './TodoForm.vue';
import { ref, computed } from 'vue'

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

const addTodo = async () => {
    console.log("Adding newTodo",newTodo)
    resetForm()
}
const updateTodo = async () => {
    console.log("updating editingTodo",editingTodo)
    cancelEdit()
}
const deleteTodo = async (id) => {
    console.log("deleting id",id)
    cancelEdit()
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


</script>
<template>
    <section id="todoform">
        <h2>Todo View</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <!-- <form v-if="!editingTodo" @submit.prevent="addTodo">
            <fieldset>
                <legend>Add: Todo</legend>
                <InputWithError inputId="Username" label="Username" v-model:task="newTodo.user" v-model:error="validationErrors.user" placeholder="Username" />
                <InputWithError inputId="Task" label="Task" v-model:task="newTodo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
                <InputWithError inputId="Date" label="Date" v-model:task="newTodo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
            </fieldset>
            <fieldset class=".grid">
                <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">Add Todo</button>
                <button type="button" @click="resetForm">Reset</button>
            </fieldset>
        </form> -->
        <TodoForm v-if="!editingTodo" v-model:loading="loading" v-model:todo="newTodo" v-model:validationErrors="validationErrors" form-label="Add: Todo" submit-label="Add Todo" reset-label="Reset" @submit="addTodo" @reset="resetForm"/>
        <TodoForm v-else v-model:loading="loading"  v-model:todo="editingTodo" v-model:validationErrors="validationErrors"  form-label="Edit: Todo" submit-label="Update Todo" reset-label="Cancel" @submit="updateTodo" @reset="cancelEdit"/>
<!-- 
        <form  @submit.prevent="updateTodo">
            <fieldset>
                <legend>Edit: Todo</legend>
                <InputWithError inputId="Username" label="Username" v-model:task="editingTodo.user" v-model:error="validationErrors.user" placeholder="Username" />
                <InputWithError inputId="Task" label="Task" v-model:task="editingTodo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
                <InputWithError inputId="Date" label="Date" v-model:task="editingTodo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
            </fieldset>
            <fieldset class=".grid">
                <button type="submit" :aria-busy="loading" :disabled="loading">Update Todo</button>
                <button type="button" @click="cancelEdit">Cancel</button>
            </fieldset>
        </form> -->
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
<style scoped></style>
