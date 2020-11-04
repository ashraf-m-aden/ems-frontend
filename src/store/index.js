import Vue from 'vue'
import Vuex from 'vuex'
import to from './to'
import fromm from './from'
import print from './print'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    to, fromm, print
  }
})
