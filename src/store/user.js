export const state = () => ({
  user: {},
  error: false,
  connected: false
})
export const getters = {
  getUser (state) {
    return state.user
  },
  getError (state) {
    return state.error
  },
  getConnected (state) {
    return state.connected
  }
}
export const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_ERROR (state) {
    state.error = true
  },
  SET_CONNECTED (state, connected) {
    state.connected = connected
  }

}
export const actions = {
  setUser ({ commit }, data) {
    commit('SET_USER', data)
    localStorage.setItem('id', data.user._id)
    localStorage.setItem('token', data.token)
  },
  logoutUser ({ commit }) {
    commit('SET_USER', {})
    localStorage.clear()
  },
  setError ({ commit }) {
    commit('SET_ERROR')
  },
  setConnected ({ commit }, connected) {
    commit('SET_CONNECTED', connected)
  },
  checkUser ({ commit, dispatch }, data) {
    commit('SET_USER', data)
  }

}

export default {
  actions,
  mutations,
  getters,
  state
}
