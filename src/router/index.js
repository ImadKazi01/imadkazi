import { createRouter, createWebHistory } from 'vue-router'
import routes from '../data/routes.json'

console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes.map((route) => ({
      path: route.url,
      name: route.name,
      component: () => import(`../views/${route.component}.vue`)
    }))
  ]
})

export default router
