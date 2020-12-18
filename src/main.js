import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
Vue.use(ElementUI);

Vue.prototype.$axios = Axios;


Vue.config.productionTip = false
Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = '/testJson4servlet';
new Vue({
  render: h => h(App),
  router: Router,
  store: Store,
}).$mount('#app');
