import axios from 'axios'
const express = axios.create({
  baseURL: process.env.VUE_APP_BACKEND
})
express.interceptors.request.use(config => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getexpress (id) {
    return express.get('/express/' + id)
  },
  getToday () {
    return express.get('/expressToday')
  },
  getAllexpress (date) {
    return express.post('/allexpress', { params: date })
  },
  postexpress (data) {
    return express.post('/express', {
      params: data
    })
  },
  updateExpressStats (data) {
    return express.post('/express-stats', {
      params: data
    })
  }
}
