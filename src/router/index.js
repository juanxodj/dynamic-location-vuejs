import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/culqi",
    name: "Culqi",
    component: () => import("../views/Culqi.vue")
  },
  {
    path: "/mailchimp",
    name: "Mailchimp",
    component: () => import("../views/Mailchimp.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
