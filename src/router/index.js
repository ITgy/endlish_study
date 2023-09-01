import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/word',
    },{
      path: '/word',
      name: 'word',
      component: () => import('@/views/word/index.vue')
    },{
      path: '/listen',
      name: 'listen',
      component: () => import('@/views/listen/index.vue')
    },{
      path: '/exaim',
      name: 'exaim',
      component: () => import('@/views/exaim/index.vue')
    }
  ]
})

export default router
