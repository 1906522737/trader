// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import Element from 'element-ui'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import './icons'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
