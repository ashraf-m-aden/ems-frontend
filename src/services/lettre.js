import axios from 'axios'
const lettre = axios.create({
  baseURL: process.env.VUE_APP_BACKEND
})
lettre.interceptors.request.use(config => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getlettre (id) {
    return lettre.get('/lettre/' + id)
  },
  getToday () {
    console.log(process.env.VUE_APP_BACKEND)
    return lettre.get('/lettreToday')
  },

  postlettre (data) {
    return lettre.post('/lettre', {
      params: data
    })
  },
  updatelettreStats (data) {
    return lettre.post('/lettre-stats', {
      params: data
    })
  }
}
