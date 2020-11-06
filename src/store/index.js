import Vue from 'vue'
import Vuex from 'vuex'
import ems from './ems'
import express from './express'
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
    ems, express, print
  }
})
