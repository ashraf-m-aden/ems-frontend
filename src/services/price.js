import axios from 'axios'
const price = axios.create({
//   baseURL: "https://aviation-backend.herokuapp.com", // https://aviation-backend.herokuapp.com

  baseURL: 'http://localhost:3000' // https://aviation-backend.herokuapp.com
})
price.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    'Bearer ' + localStorage.getItem('token')
  return config
})
export default {
  getPrice (data) {
    return price.post('/price', {
      params: data
    })
  },
  getCountry () {
    return price.get('/allCountry')
  }

}
