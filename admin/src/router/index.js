import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { isPublic: true },
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/',
    name: 'Main',
    meta: { isPublic: false },
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/categories/list',
        name: 'CategoriesList',
        meta: { isPublic: false },
        component: () => import('../views/CategoriesList/index.vue')
      },
      {
        path: '/categories/items',
        name: 'CategoriesItems',
        meta: { isPublic: false },
        component: () => import('../views/CategoriesItems/index.vue')
      },
      {
        path: '/categories/heroes',
        name: 'CategoriesHeroes',
        meta: { isPublic: false },
        component: () => import('../views/CategoriesHeroes/index.vue')
      },
      {
        path: '/categories/articles',
        name: 'CategoriesArticles',
        meta: { isPublic: false },
        component: () => import('../views/CategoriesArticles/index.vue')
      },
      {
        path: '/categories/ads',
        name: 'CategoriesAds',
        meta: { isPublic: false },
        component: () => import('../views/CategoriesAds/index.vue')
      },
      {
        path: '/admin_users/list',
        name: 'AdminUsers',
        meta: { isPublic: false },
        component: () => import('../views/AdminUsers/index.vue')
      }
    ]
  }
]

// 设置路由为history模式
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
