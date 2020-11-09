import axios from 'axios'
const login = axios.create({
  baseURL: process.env.VUE_APP_BACKEND

})
login.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  login (data) {
    return login.post('/users/login', {
      params: data
    })
  },
  getUser (id) {
    return login.get('/users/' + id)
  },
  logout () {
    return login.post('/users/logout/')
  }

}
