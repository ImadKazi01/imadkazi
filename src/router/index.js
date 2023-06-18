import { createRouter, createWebHistory } from 'vue-router'
import routes from '../data/routes.json'
import ServiceView from '../views/ServicesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes.map((route) => ({
      path: route.url,
      name: route.name,
      component: () => import(`../views/${route.component}.vue`),
      meta: route.meta || {}
    })),
    {
      path: '/services/development',
      name: 'Development',
      component: ServiceView,
      meta: {
        title: 'Development',
        link: '/development-link'
      }
    },
    {
      path: '/services/design',
      name: 'Design',
      component: ServiceView,
      meta: {
        title: 'Design',
        link: '/design-link'
      }
    },
    {
      path: '/services/photography',
      name: 'Photography',
      component: ServiceView,
      meta: {
        title: 'Photography',
        link: '/photography-link'
      }
    }
  ]
})

router.beforeEach((to) => {
  const baseTitle = 'Imad Kazi';
  const pageTitle = to.meta.title || 'Designer • Developer • Photographer';
  document.title = `${baseTitle} | ${pageTitle}`;
});

export default router
