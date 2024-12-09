<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoTable from '../components/TodoTable.vue'
import { useRouter } from 'vue-router'

const todoStore = useTodoStore()
const router = useRouter()

const editTodo = (id) => {
    router.push({ name: 'TodoEdit', params: { id } })
}

const deleteTodo = async (id) => {
    await todoStore.deleteTodo(id)
}

onMounted(async () => {
    await todoStore.fetchTodos()
})
</script>
<template>
    <section id="todo-list">
        <h2>Todo List</h2><small>
        </small>
        <div v-if="todoStore.error" class="error-message"> {{ todoStore.error }} </div>
        <TodoTable :loading="todoStore.loading" :todos="todoStore.todos" @edit-click="editTodo" @remove-click="deleteTodo" />
    </section>
</template>
<style scoped>
.error-message {
    color: red;
    margin-bottom: 15px;
}
</style>
