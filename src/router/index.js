import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Dashboard from '../views/Dashboard.vue'
import COLIS from '../views/colis/Colis.vue'
import ALLCOLIS from '../views/all/Colis.vue'
import REVIEW from '../views/colis/Review.vue'
import EXPRESSREVIEW from '../views/express/Review.vue'
import EXPRESS from '../views/express/Express.vue'
import LETTRES from '../views/Lettre/Lettre.vue'
import LETTREREVIEW from '../views/Lettre/Review.vue'
import STATISTIQUE from '../views/Stats/Index.vue'
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
    component: COLIS,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/all-ems',
    name: 'Tous les colis ems',
    component: ALLCOLIS,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/review',
    name: 'Review',
    component: REVIEW,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/express',
    name: 'Express',
    component: EXPRESS,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/express-review',
    name: 'Express REVIEW',
    component: EXPRESSREVIEW,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/lettres',
    name: 'LETTRES',
    component: LETTRES,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/lettre-review',
    name: 'LETTRE REVIEW',
    component: LETTREREVIEW,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/statistiques',
    name: 'Statistique',
    component: STATISTIQUE,
    beforeEnter: (to, from, next) => {
      if (store.getters.getConnected) {
        next()
      } else {
        next({ name: 'LOGIN' })
      }
    }
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: LOGIN,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('id')) {
        next({ name: 'Dashboard' })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
