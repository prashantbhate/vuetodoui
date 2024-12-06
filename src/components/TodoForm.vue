<template>
    <form @submit.prevent="submitHandler">
        <fieldset>
            <legend>{{ formLabel }}</legend>
            <InputWithError inputId="Username" label="Username" v-model:task="todo.user" v-model:error="validationErrors.user" placeholder="Username" />
            <InputWithError inputId="Task" label="Task" v-model:task="todo.task" v-model:error="validationErrors.task" placeholder="Task (10-200 chars)" type="textarea" />
            <InputWithError inputId="Date" label="Date" v-model:task="todo.targetDate" v-model:error="validationErrors.targetDate" type="date" :min="today" />
        </fieldset>
        <fieldset class="grid">
            <button type="submit" class="outline" :aria-busy="loading" :disabled="loading">{{submitLabel}}</button>
            <button type="button" @click="resetHandler">{{resetLabel}}</button>
        </fieldset>
    </form>
</template>

<script setup>
import InputWithError from './InputWithError.vue';
import { computed } from 'vue'

const todo = defineModel('todo')
const validationErrors = defineModel('validationErrors')
const loading = defineModel('loading')
const props = defineProps([
"formLabel",
"submitLabel",
"resetLabel",
]);
const emit = defineEmits(['submit', 'reset'])

const today = computed(() => new Date().toISOString().split('T')[0])


const submitHandler=()=>{
  emit('submit', {
    timestamp: new Date()
  });
}
const resetHandler=()=>{
  emit('reset', {
    timestamp: new Date()
  });
}

</script>

<style scoped>

</style>