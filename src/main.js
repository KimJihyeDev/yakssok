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
// Vue.prototype.$url = 'http://localhost:4000';

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

// 전역가드 설정
// 모든 라우트에서 사용
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/entry', '/profile'];
  // const authRequired = !publicPages.includes(to.path);

  const token = localStorage.getItem('YAKSSOK-TOKEN');

  // 토큰이 있다면 유효성 검사
  if(token){
    (async () => {
      try{
          const result = await axios.get(`${ store.state.url }/users/token`, { headers: { authorization: token }});
          console.log(result);
            if(result.data.code === 401){
               console.log('유효하지 않은 토큰');
            }else if(result.data.code === 419){
               console.log('만료된 토큰')
            }
          next();
      }catch(err){
           console.log(err);
      }
  })();
  }


  const loggedIn = localStorage.getItem('YAKSSOK-TOKEN');
  console.log(loggedIn);

  if (loggedIn) {
    // 로그인 상태면 token을 store에 저장
    store.commit('logIn');
    return next();


  }
// 로그인 된 상태에서는 login, entry, profile에 접근 못하게 막는다


  next();
})

new Vue({
  store, // Vue 객체에 직접 정의해 줄 경우 컴포넌트에서 import 할 필요가 없다.
  router,
  render: h => h(App),
}).$mount('#app')
