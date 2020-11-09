import axios from 'axios'
const stats = axios.create({
  baseURL: process.env.VUE_APP_BACKEND

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
