import axios from 'axios'
const login = axios.create({
  baseURL: 'https://colis-backend.herokuapp.com' // https://colis-backend.herokuapp.com

  // baseURL: 'http://localhost:3000' // https://colis-backend.herokuapp.com
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
