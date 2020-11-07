import axios from 'axios'
const express = axios.create({
//   baseURL: "https://aviation-backend.herokuapp.com", // https://aviation-backend.herokuapp.com

  baseURL: 'http://localhost:3000' // https://aviation-backend.herokuapp.com
})
express.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getexpress (id) {
    return express.get('/express/' + id)
  },
  getAllexpress (date) {
    return express.post('/allexpress',
      { params: date })
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
