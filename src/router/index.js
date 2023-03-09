import { createRouter, createWebHashHistory } from "vue-router";

const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/home.vue')
        },
        {
            path: '/manage',
            component: () => import('../views/list.vue')
        },
        {
            path: '/settings',
            component: () => import('../views/home.vue')
        },

    ]
})

export default Router