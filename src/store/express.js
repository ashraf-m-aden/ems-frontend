import priceService from '../services/price'
export const state = () => ({
  to: {
    name: '',
    address: '',
    tel: '',
    cp: '',
    town: '',
    country: '',
    price: ''
  },
  countries: [],
  zones: [],
  from: {
    name: '',
    tel: '',
    cp: '',
    town: '',
    address: '',
    contract: '',
    isDoc: false,
    isMarchandise: false,
    object: '',
    number: '',
    weight: '',
    value: '',
    etiquette: ''
  }
})
export const getters = {
  getExpressTo (state) {
    return state.to
  },
  getExpressFrom (state) {
    return state.from
  },
  getExpressCountry (state) {
    return state.countries
  },
  getExpressZone (state) {
    return state.zones
  }
}
export const mutations = {
  SET_EXPRESS_TO (state, to) {
    state.to = to
  },
  SET_EXPRESS_COUNTRY (state, countries) {
    state.countries = countries
  },
  SET_EXPRESS_ZONE (state, zones) {
    state.zones = zones
  },
  SET_EXPRESS_FROM (state, from) {
    state.from = from
  }
}
export const actions = {
  setExpressTo ({ commit }, to) {
    commit('SET_EXPRESS_TO', to)
  },
  setExpressCountry ({ commit }) {
    priceService.getCountry().then((countries) => {
      commit('SET_EXPRESS_COUNTRY', countries.data)
    }).catch((error) => {
      console.log('erreur de recuperation des pays. ' + error)
    })
  },
  setExpressZone ({ commit }) {
    priceService.getZone().then((zones) => {
      commit('SET_EXPRESS_ZONE', zones.data)
    }).catch((error) => {
      console.log('erreur de recuperation des zones. ' + error)
    })
  },
  setExpressFrom ({ commit }, from) {
    commit('SET_EXPRESS_FROM', from)
  }
}

export default {
  actions,
  mutations,
  getters,
  state
}
