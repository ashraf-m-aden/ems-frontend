import axios from 'axios'
const price = axios.create({
  baseURL: process.env.VUE_APP_BACKEND

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
  getlettrePrice (data) {
    return price.post('/lettrePrice', {
      params: data
    })
  },
  getlettreZone (type) {
    return price.post('/lettrezone', {
      params: type
    })
  },
  getCountry () {
    return price.get('/allCountry')
  },
  getZone () {
    return price.get('/allZone')
  }

}
