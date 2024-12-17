import { createRouter, createWebHistory } from "vue-router";
import DailyView from "../views/DailyView.vue";

const routes = [
  {
    path: "/",
    name: "Daily",
    component: DailyView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
