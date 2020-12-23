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
    team: {
      cap_id: 0,
      captain: "",
      fulled: false,
      id: 0,
      mem1_id: 0,
      mem2_id: 0,
      member1: "",
      member2:"",
      su_id: 0,
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
    saveTeam(state, team){
      state.team = team;
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