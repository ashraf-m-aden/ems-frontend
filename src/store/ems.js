import priceService from '../services/price'
export const state = () => ({
  to: {
    name: '',
    address: '',
    tel: '',
    cp: '',
    town: '',
    country: '',
    object: '',
    value: '',
    weight: '',
    date: '',
    price: ''
  },
  countries: [],
  from: {
    name: '',
    tel: '',
    cp: '',
    town: ''
  }
})
export const getters = {
  getTo (state) {
    return state.to
  },
  getFrom (state) {
    return state.from
  },
  getCountry (state) {
    return state.countries
  }
}
export const mutations = {
  SET_TO (state, to) {
    state.to = to
  },
  SET_COUNTRY (state, countries) {
    state.countries = countries
  },
  SET_FROM (state, from) {
    state.from = from
  }
}
export const actions = {
  setTo ({ commit }, to) {
    commit('SET_TO', to)
  },
  setCountry ({ commit }) {
    priceService.getCountry().then((countries) => {
      commit('SET_COUNTRY', countries.data)
    }).catch((error) => {
      console.log('erreur de recuperation des pays. ' + error)
    })
  },
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
