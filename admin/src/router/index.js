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
        component: () => import("../views/CategoriesList/index.vue"),
      },
      {
        path: "/categories/items",
        name: "CategoriesItems",
        component: () => import("../views/CategoriesItems/index.vue"),
      },
      {
        path: "/categories/heroes",
        name: "CategoriesHeroes",
        component: () => import("../views/CategoriesHeroes/index.vue"),
      },
      {
        path: "/categories/articles",
        name: "CategoriesArticles",
        component: () => import("../views/CategoriesArticles/index.vue"),
      },
      {
        path: "/categories/ads",
        name: "CategoriesAds",
        component: () => import("../views/CategoriesAds/index.vue"),
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
