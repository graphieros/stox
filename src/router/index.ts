import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/charts",
    name: "Charts",
    component: () => import("../views/Charts.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
