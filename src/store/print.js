export const state = () => ({
  print: false
})
export const getters = {
  getPrint (state) {
    return state.print
  }
}
export const mutations = {
  SET_PRINT (state, print) {
    state.print = print
  }

}
export const actions = {
  setprint ({ commit }, print) {
    commit('SET_PRINT', print)
  }

}

export default {
  actions,
  mutations,
  getters,
  state
}
