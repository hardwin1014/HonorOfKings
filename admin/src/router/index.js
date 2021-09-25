import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children:[
      {
        path: "/categories/create",
        name: "CategoriesEdit",
        component: () => import("../views/CategoriesEdit.vue")
      },
      {
        path: "/categories/list",
        name: "CategoriesList",
        component: () => import("../views/CategoriesList.vue")
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
