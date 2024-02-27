import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { layoutMiddleware } from '@/router/loadLayout.middleware'
import { EPageName, EPagePath, ELayoutsName, ELocalStoragesName } from '@/enums'
import { getLocalStorage } from '@/utils/functions.utils'

const routes: RouteRecordRaw[] = [
  {
    path: EPagePath.main,
    name: EPageName.main,
    component: HomeView,
    meta: { layout: ELayoutsName.main, auth: true }
  },
  {
    path: EPagePath.auth,
    name: EPageName.auth,
    component: () => import('../views/AuthView.vue'),
    meta: { layout: ELayoutsName.auth }
  },
  {
    path: EPagePath.random,
    redirect: {
      name: EPageName.main,
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(layoutMiddleware)
router.beforeEach((to, from, next) => {
  const isAuthorization = getLocalStorage(ELocalStoragesName.token)
  const requireAuth = to.matched.some((record) => record.meta.auth)
  if (requireAuth && !isAuthorization) {
    next(EPagePath.auth)
  } else if (!requireAuth && isAuthorization) {
    next(EPagePath.main)
  } else {
    next()
  }
})
export default router
