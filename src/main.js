import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router/routes.js'
import axios from 'axios'

Vue.use(VueRouter);
// axios 추가
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// API 서버의 url
Vue.prototype.$url = 'http://localhost:4000';
// Vue.prototype.$test = 'vue 전역변수 테스트'


const router = new VueRouter({
  routes:Routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
