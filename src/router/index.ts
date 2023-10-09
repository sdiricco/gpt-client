import { createRouter, createWebHistory } from 'vue-router'
const getHomeViewPage = () => import('@/views/HomeView.vue')
const getAuthPage = () => import('@/views/AuthPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: getAuthPage
    },
    {
      path: '/home',
      name: 'home',
      component: getHomeViewPage
    },
  ]
})

export default router
