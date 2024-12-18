import { createRouter, createWebHistory } from "vue-router";
import DailyView from "../views/DailyView.vue";
import MonthlyView from "../views/MonthlyView.vue";
import YearlyView from "../views/YearlyView.vue";

const routes = [
  {
    path: "/",
    name: "Daily",
    component: DailyView,
  },
  {
    path: "/monthly",
    name: "Monthly",
    component: MonthlyView,
  },
  {
    path: "/yearly",
    name: "Yearly",
    component: YearlyView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
