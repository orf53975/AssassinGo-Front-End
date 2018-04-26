// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Ajax from './tools/ajax'
import Cookie from './tools/cookie'
import Websocket from './tools/websocket'
import 'font-awesome/css/font-awesome.css'
import '../static/css/base.css'

Vue.use(Ajax);
Vue.use(Websocket);
Vue.use(Cookie);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
