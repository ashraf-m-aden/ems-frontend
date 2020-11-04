import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import COLIS from '../views/colis/Colis.vue'
import ALLCOLIS from '../views/all/Colis.vue'
import REVIEW from '../views/colis/Review.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/colis-ems',
    name: 'Colis',
    component: COLIS
  },
  {
    path: '/all-ems',
    name: 'Tous les colis ems',
    component: ALLCOLIS
  },
  {
    path: '/review',
    name: 'Review',
    component: REVIEW
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
