import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/about.vue')
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: () => import('../views/portfolio.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router