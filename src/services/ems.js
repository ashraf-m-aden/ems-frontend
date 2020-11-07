import axios from 'axios'
const ems = axios.create({
//   baseURL: "https://aviation-backend.herokuapp.com", // https://aviation-backend.herokuapp.com

  baseURL: 'http://localhost:3000' // https://aviation-backend.herokuapp.com
})
ems.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getEms (id) {
    return ems.get('/ems/' + id)
  },
  getAllEms (date) {
    return ems.post('/allEms',
      { params: date })
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
