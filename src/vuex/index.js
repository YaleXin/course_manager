import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navagationIndex: 1,
    isLogin: false,
    user: {
      username: '',
      nickname: '',
      role: '',
    },
  },
  mutations: {
    changeIndex (state, newIndex) {
      state.navagationIndex = newIndex;
    },
    userLogout (state, user) {
      state.isLogin = false;
      state.user = {};
    },
    saveUser(state, user) {
      state.user = user;
      state.isLogin = true;
    },
  }
})

export default store