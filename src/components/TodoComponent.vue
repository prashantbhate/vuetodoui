<script setup>
import TodoForm from './TodoForm.vue';
import { ref, computed } from 'vue'
import TodoTable from './TodoTable.vue';

const todos = ref([{
    id: '1',
    user: 'abcd',
    task: 'task123',
    done: false,
    targetDate: '12/12/2024'
}, {
    id: '2',
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
    console.log("Adding newTodo", newTodo.value)
    resetForm()
}
const updateTodo = async () => {
    console.log("updating editingTodo", editingTodo.value)
    cancelEdit()
}
const deleteTodo = async (id) => {
    console.log("deleting id", id)
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
const editTodo = (id) => {
    console.log("edit id", id)
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
        const todo = todos.value[index]
        const todoCopy = { ...todo }
        console.log(todoCopy)
        editingTodo.value = todoCopy // Create a copy to avoid direct mutations
    }
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
        <TodoForm v-if="!editingTodo" :loading="loading" v-model:todo="newTodo" v-model:validationErrors="validationErrors" form-label="Add: Todo" submit-label="Add Todo" reset-label="Reset" @submit="addTodo" @reset="resetForm" />
        <TodoForm v-else :loading="loading" v-model:todo="editingTodo" v-model:validationErrors="validationErrors" form-label="Edit: Todo" submit-label="Update Todo" reset-label="Cancel" @submit="updateTodo" @reset="cancelEdit" />
    </section>
    <section id="todotable">
        <h2>Todo List</h2>
        <div>
            <TodoTable :loading="loading" :todos="todos" @edit-click="editTodo" @remove-click="deleteTodo" />
        </div>
    </section>
</template>
<style scoped></style>
