import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/hardware', name: 'hardware', component: () => import('@/pages/FleetPage.vue') },
    {
      path: '/hardware/:slug',
      name: 'product',
      component: () => import('@/pages/ProductPage.vue'),
      props: true,
    },
    { path: '/pricing', name: 'pricing', component: () => import('@/pages/CalculatorPage.vue') },
    {
      path: '/deployment',
      name: 'deployment',
      component: () => import('@/pages/DeploymentPage.vue'),
    },
    { path: '/faq', name: 'faq', component: () => import('@/pages/FaqPage.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/careers', name: 'careers', component: () => import('@/pages/CareersPage.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
    // Legacy paths
    { path: '/fleet', redirect: '/hardware' },
    { path: '/calculator', redirect: '/pricing' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
