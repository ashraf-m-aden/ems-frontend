export const state = () => ({
  countries: []

})
export const getters = {

  getlettreCountry (state) {
    return state.countries
  }
}
export const mutations = {
  SET_COUNTRY (state, countries) {
    state.countries = countries
  }

}
export const actions = {
}

export default {
  actions,
  mutations,
  getters,
  state
}
