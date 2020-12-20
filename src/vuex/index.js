import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navagationIndex: 1,
    isLogin: false,
    adminLogin: false,
    user: {
      username: '',
      nickname: '',
      role: '',
    },
    adminUser: {
      id: -1,
      username: "",
      password: "",
    }
  },
  mutations: {
    changeIndex(state, newIndex) {
      state.navagationIndex = newIndex;
    },
    userLogout(state, user) {
      state.isLogin = false;
      state.user = {};
    },
    saveUser(state, user) {
      state.user = user;
      state.isLogin = true;
    },
    adminUserLogout(state) {
      state.adminLogin = false;
      state.adminUser = {
        id: -1,
        username: "",
        password: "",
      };
    },
    saveAdminUser(state, adminUser) {
      state.adminUser = adminUser;
      state.adminLogin = true;
    },
  }
})

export default store