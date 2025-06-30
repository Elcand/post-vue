import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/user/Index.vue";
import PostIndex from "../pages/posts/Index.vue";
import PostShow from "../pages/posts/Show.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/posts/index/:id",
    component: PostIndex,
  },
  {
    path: "/posts/show/:id",
    component: PostShow,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
