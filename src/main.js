import Vue from 'vue'
import VueAxios from 'vue-axios';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
axios.defaults.baseURL = '/api'
// import VeLine from 'v-charts/lib/line.common'
// Vue.component(VeLine.name, VeLine)
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.prototype.$getToken = getToken
Vue.prototype.$setToken = setToken
Vue.prototype.removeToken = removeToken
Vue.use(VueAxios, axios)
import VCharts from 'v-charts'
Vue.use(VCharts)
// import VCharts from 'v-charts-v2'
// Vue.use(VCharts)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

axios.interceptors.request.use(config => {
  //此处读取上文存储的token并设置请求头
 config.headers.Authorization = window.sessionStorage.getItem('token')
 // 这里需要注意，必须return config才能生效
 return config
})
