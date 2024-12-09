<template>
    <div v-if="todos && todos.length" class="container">
        <article v-for="todo in todos" :key="todo.id" class="box">
            <header>
                <h3>{{ todo.title }}</h3>
                <p><strong>Date:</strong> {{ todo.targetDate }}</p>
            </header>
            <p><strong>Task:</strong> {{ todo.task }}</p>
            <footer>
                <small><strong>Author:</strong> {{ todo.user }}</small>
                <p class="grid">
                    <button :aria-busy="loading" :disabled="loading" class="icon-button1" @click="todo.done = !todo.done" aria-label="Edit"> {{ todo.done ? '✅' : '⬜️' }} </button>
                    <button :aria-busy="loading" :disabled="loading" class="icon-button1" @click="() => editHandler(todo.id)" aria-label="Edit"> ✏️ </button>
                    <button :aria-busy="loading" :disabled="loading" class="icon-button1" @click="() => deleteHandler(todo.id)" aria-label="Delete"> 🗑️ </button>
                </p>
            </footer>
        </article>
    </div>
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
<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}

.box {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.icon-button1 {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
}

.icon-button1:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.icon-button1:hover {
    background-color: rgba(0, 0, 0, .3);
    border-radius: 50px;
}
</style>