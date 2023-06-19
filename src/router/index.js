import { createRouter, createWebHistory } from 'vue-router'
import routes from '../data/routes.json'
import ServiceRoutes from '../data/service.json'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes.map((route) => ({
      path: route.path,
      name: route.title,
      component: () => import(`../views/${route.component}.vue`),
      meta: route.meta || {}
    })),
    ...ServiceRoutes.map((route) => ({
      path: route.path,
      name: route.title,
      component: () => import(`../views/${route.component}.vue`),
      meta: route.meta || {}
    }))
  ]
})

router.beforeEach((to) => {
  const baseTitle = 'Imad Kazi'
  const pageTitle = to.meta.title || 'Designer • Developer • Photographer'
  document.title = `${baseTitle} | ${pageTitle}`
})

export default router
