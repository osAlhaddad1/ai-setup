import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('@/pages/CalculatorPage.vue'),
    },
    { path: '/fleet', name: 'fleet', component: () => import('@/pages/FleetPage.vue') },
    {
      path: '/deployment',
      name: 'deployment',
      component: () => import('@/pages/DeploymentPage.vue'),
    },
    { path: '/faq', name: 'faq', component: () => import('@/pages/FaqPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
