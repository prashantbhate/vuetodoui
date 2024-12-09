<template>
    <table v-if="todos && todos.length">
        <thead>
            <tr>
                <th>Title</th>
                <th>Task</th>
                <th>Date</th>
                <th>Done?</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.title }}({{ todo.user }}) </td>
                <td>{{ todo.task }}</td>
                <td>{{ todo.targetDate }}</td>
                <td><input type="checkbox" v-model="todo.done" /></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => editHandler(todo.id)">Edit</button></td>
                <td><button :aria-busy="loading" :disabled="loading" @click="() => deleteHandler(todo.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
const props = defineProps([
    "todos",
    "loading"
]);

const emit = defineEmits(['editClick', 'removeClick'])

const editHandler = (id) => {
    emit('editClick', id);
}
const deleteHandler = (id) => {
    emit('removeClick', id);
}
</script>
<style scoped></style>