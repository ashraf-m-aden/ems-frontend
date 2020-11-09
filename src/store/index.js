import Vue from 'vue'
import Vuex from 'vuex'
import ems from './ems'
import express from './express'
import lettre from './lettre'
import print from './print'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ems, express, print, user, lettre
  }
})
