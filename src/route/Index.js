import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/user/Index.vue'
import PostIndex from '../pages/posts/Index.vue';
import UserIndex from '../pages/user/Index.vue';

const routes = [
    {
        path: '/user/index',
        component: Home
    },
    {
        path: '/user/index',
        component: UserIndex
    },
    {
        path: '/posts/index/:id',
        component: PostIndex
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
