import { createRouter, createWebHistory } from 'vue-router';
import PostIndex from '../pages/posts/Index.vue';

const routes = [
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
