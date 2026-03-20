import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/LoginView.vue";
import Signup from "../views/SignupView.vue";
import Employee from "../views/EmployeeView.vue";
import Employer from "../views/EmployerView.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },
  { path: "/employee", component: Employee },
  { path: "/employer", component: Employer }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;