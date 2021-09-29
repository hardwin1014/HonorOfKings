import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/categories/list",
        name: "CategoriesList",
        component: () => import("../views/CategoriesList.vue"),
      },
      {
        path: "/categories/items",
        name: "CategoriesItems",
        component: () => import("../views/CategoriesItems.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
