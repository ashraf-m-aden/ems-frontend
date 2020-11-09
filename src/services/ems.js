import axios from 'axios'
const ems = axios.create({
  baseURL: process.env.VUE_APP_BACKEND
})
ems.interceptors.request.use(config => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getEms (id) {
    return ems.get('/ems/' + id)
  },
  getToday () {
    return ems.get('/emsToday')
  },
  getAllEms (date) {
    return ems.post('/allEms', { params: date })
  },
  postEms (data) {
    return ems.post('/ems', {
      params: data
    })
  },
  updateEmsStats (data) {
    return ems.post('/ems-stats', {
      params: data
    })
  }
}
