import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { layoutMiddleware } from '@/router/loadLayout.middleware'
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
    meta: { layout: 'auth' }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(layoutMiddleware)
router.beforeEach((to, from, next) => {
  const isAuthorization = localStorage.getItem('token')
  const requireAuth = to.matched.some((record) => record.meta.auth)
  console.log(requireAuth)
  if (requireAuth && !isAuthorization) {
    next('/auth')
  } else if (!requireAuth && isAuthorization) {
    next('/home')
  } else {
    next()
  }
})
export default router
