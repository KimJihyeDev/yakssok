import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import router from '@/router/routes'
import axios from 'axios'
//Vuex Store 자바스크립트 모듈 추가
import store from '@/store.js'
import io from 'socket.io-client';

Vue.use(VueRouter);
// axios 추가(전역변수로 사용)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// API 서버의 url
// Vue.prototype.$url = 'http://localhost:4000';

// store에서도 router 사용 가능하게끔 설정
store.state.router = router;
// 웹소켓 
const socket = io(`${ store.state.url }`);
Vue.prototype.$socket = socket;


// 전역가드 설정
// 모든 라우트에서 사용
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/entry', '/profile'];
  // const authRequired = !publicPages.includes(to.path);

  const token = localStorage.getItem('YAKSSOK-TOKEN');


  if (token) {
    // localStorage에 토큰이 있다면 token을 store에 저장
    store.commit('logIn');
    return next();
  }
// 로그인 된 상태에서는 login, entry, profile에 접근 못하게 막는다

  next();
})

// beforeCreate(){},
new Vue({
  store, // Vue 객체에 직접 정의해 줄 경우 컴포넌트에서 import 할 필요가 없다.
  router,
  render: h => h(App),
}).$mount('#app')
