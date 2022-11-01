import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import phonecode from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token
    data: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    //console.log()
  },
  mutations: {
    // 修改token，并将token存入sessionStorage
    changeLogin (state, user) {
      state.token = user.token;
      sessionStorage.setItem('token', user.token);
    }
  },
  modules: {
    app,
    settings,
    user,
    phonecode,

  },
  getters
})

export default store
