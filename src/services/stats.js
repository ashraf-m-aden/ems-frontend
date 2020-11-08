import axios from 'axios'
const stats = axios.create({
  baseURL: 'https://colis-backend.herokuapp.com' // https://colis-backend.herokuapp.com

  // baseURL: 'http://localhost:3000' // https://colis-backend.herokuapp.com
})
stats.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getEmsStatsYear () {
    return stats.get('/emsYear')
  },
  getEmsStatsMonth (month) {
    return stats.get('/emsMonth/' + month)
  }

}
