import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/user/Index.vue";
import EditUser from "../pages/user/Edit.vue";
import PostIndex from "../pages/posts/Index.vue";
import PostShow from "../pages/posts/Show.vue";
import PostEdit from "../pages/posts/Edit.vue";
import PostCreate from "../pages/posts/Create.vue";
import UserCreate from "../pages/user/Create.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/", // as dashboard
    component: Home,
  },
  {
    path: "/users/create",
    component: UserCreate,
  },
  {
    path: "/users/edit/:id",
    component: EditUser,
  },
  {
    path: "/posts/index/:id",
    component: PostIndex,
  },
  {
    path: "/posts/create/:userId",
    component: PostCreate,
  },
  {
    path: "/posts/show/:id",
    component: PostShow,
  },
  {
    path: "/posts/edit/:id",
    component: PostEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
