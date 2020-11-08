import axios from 'axios'
const price = axios.create({
  baseURL: 'https://colis-backend.herokuapp.com' // https://colis-backend.herokuapp.com

  // baseURL: 'http://localhost:3000' // https://colis-backend.herokuapp.com
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
  getExpressPrice (data) {
    return price.post('/zoneprice', {
      params: data
    })
  },
  getCountry () {
    return price.get('/allCountry')
  },
  getZone () {
    return price.get('/allZone')
  }

}
