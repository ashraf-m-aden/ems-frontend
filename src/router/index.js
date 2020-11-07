import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import COLIS from '../views/colis/Colis.vue'
import ALLCOLIS from '../views/all/Colis.vue'
import REVIEW from '../views/colis/Review.vue'
import EXPRESSREVIEW from '../views/express/Review.vue'
import EXPRESS from '../views/express/Express.vue'
import LOGIN from '../views/Login.vue'

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
  },
  {
    path: '/express',
    name: 'Express',
    component: EXPRESS
  },
  {
    path: '/express-review',
    name: 'Express REVIEW',
    component: EXPRESSREVIEW
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: LOGIN
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
