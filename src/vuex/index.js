import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navagationIndex: 1,
    isLogin: false,
  },
  mutations: {
    changeIndex (state, newIndex) {
      state.navagationIndex = newIndex;
    },
    userLogout (state, user) {
      state.isLogin = false;
    }
  }
})

export default store