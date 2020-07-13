import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//全局引用cookie方法类
import cookie from './static/js/cookie';

const userInfo = {
  username:cookie.getCookie('username')||'',
  token:cookie.getCookie('token')||''
};
const tutorials_menu = {}
const create_article =  {}

export default new Vuex.Store({
  state: {
    userInfo,
    tutorials_menu,
    create_article
  },
  mutations: {

  },
  actions: {

  }
})
