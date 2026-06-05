import { createRouter, createWebHistory } from 'vue-router'
import routes from '../data/routes.json'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes.map((route) => ({
      path: route.path,
      name: route.title,
      component: () => import(`../views/${route.component}.vue`),
      meta: route.meta || {}
    })),
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      meta: { title: 'Not Found' },
      component: () => import('../views/NotFound.vue')
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const baseTitle = 'Imad Kazi'
  const pageTitle = to.meta.title || 'Designer • Developer • Photographer'
  document.title = `${baseTitle} | ${pageTitle}`
})

export default router
