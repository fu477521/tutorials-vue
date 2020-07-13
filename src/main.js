import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//全局加载resource拦截器
import './axios/';
import Axios from 'axios';
Vue.prototype.$http = Axios

import './assets/iconfont/iconfont.css'
// 高亮显示
import 'highlight.js/styles/default.css';
import Highlight from 'vue-markdown-highlight'
Vue.use(Highlight)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
