import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import styles from './sass/main.scss'
import VueHtmlToPaper from 'vue-html-to-paper'
import './fonts/fontstyle.scss'
import Chart from 'vue2-frappe'

Vue.use(Chart)
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options)

Vue.config.productionTip = false
Vue.use(styles)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
