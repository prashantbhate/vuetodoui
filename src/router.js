
import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from './views/TodoListView.vue'
import TodoAddView from './views/TodoAddView.vue'
import TodoEditView from './views/TodoEditView.vue'
import LoginView from './views/LoginView.vue'
import SignupView from './views/SignupView.vue'
import AuthLayout from './layout/AuthLayout.vue'
import HomeLayout from './layout/HomeLayout.vue'

const routes = [
    {
        path: "/login",
        component: AuthLayout,
        children: [{ path: "", component: LoginView }],
    },
    {
        path: "/signup",
        component: AuthLayout,
        children: [{ path: "", component: SignupView }],
    },
    {
        path: "/",
        component: HomeLayout,
        children:
            [{
                path: '/',
                name: 'TodoList',
                component: TodoListView,
            },
            {
                path: '/add',
                name: 'TodoAdd',
                component: TodoAddView,
            },
            {
                path: '/edit/:id',
                name: 'TodoEdit',
                component: TodoEditView,
                props: true,
            }],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router