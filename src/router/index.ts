import { createRouter, createWebHistory } from 'vue-router'

import routes from '@router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, _, savedPosition) {
    if (to.hash.length > 0) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    if (savedPosition != null) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
