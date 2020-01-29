import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Routes from '@/router/routes.js'
import axios from 'axios'
//Vuex Store 자바스크립트 모듈 추가
import store from '@/store.js'

Vue.use(VueRouter);
// axios 추가(전역변수로 사용)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// API 서버의 url
Vue.prototype.$url = 'http://localhost:4000';
// Vue.prototype.$test = 'vue 전역변수 테스트'




const router = new VueRouter({
  routes:Routes
})

new Vue({
  store, // Vue 객체에 직접 정의해 줄 경우 컴포넌트에서 import 할 필요가 없다.
  router,
  render: h => h(App),
}).$mount('#app')
