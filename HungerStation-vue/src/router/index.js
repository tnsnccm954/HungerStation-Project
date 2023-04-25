import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'FindStation',
      component: () => import('../views/SearchView.vue'),
      props:(route)=>({query:route.query.place}),
    }
  ]
})

export default router
