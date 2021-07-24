import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyServerHTTP from '@/plugins/http.js'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyServerHTTP)

Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
