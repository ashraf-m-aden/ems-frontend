export const state = () => ({
  from: {
    name: '',
    tel: '',
    cp: '',
    town: ''
  }
})
export const getters = {
  getFrom (state) {
    return state.from
  }
}
export const mutations = {
  SET_FROM (state, from) {
    state.from = from
  }
}
export const actions = {
  setFrom ({ commit }, from) {
    commit('SET_FROM', from)
  }
}

export default {
  actions,
  mutations,
  getters,
  state
}
