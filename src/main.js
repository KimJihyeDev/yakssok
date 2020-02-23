import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import router from '@/router/routes'
import axios from 'axios'
//Vuex Store 자바스크립트 모듈 추가
import store from '@/store.js'
import io from 'socket.io-client';


// 앱이 새로 시작될 때 마다 main.js 가 읽힌다
// = 페이지 새로고침 될 때(즉,router.push로는 실행X)
console.log('main.js파일')

Vue.use(VueRouter);
// axios 추가(전역변수로 사용)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.prototype.$store = store;

// 로그인 후 소켓연결
const chatSocket = io(`${store.state.url}/chat`);

Vue.prototype.$chatSocket = chatSocket;

// 로그인 후 소켓에 연결하기 위해 user_id를 가져온다
// webcome이벤트로 서버에서 socket id를 받아온다.
chatSocket.on('welcome',  (socket_id) => {
  console.log('서버에서 받은소켓id')
  console.log(socket_id)
   
  store.dispatch('getUserId', socket_id);
});

// Vue객체가 만들어지기 전에 실행(컴포넌트가 아니라 Vue객체)
// 아래 코드는 어디 페이지에서 시작하든 App이 시작시 반드시 거친다
new Vue({
  store, // Vue 객체에 직접 정의해 줄 경우 컴포넌트에서 import 할 필요가 없다.
  router,
  beforeCreate() { // beforeCreate인데도 this사용가능
    this.$store.dispatch('getUserId'); // 앱이 시작할 때마다 유저 id알아오기
    console.log('vue객체, beforecreate')
  },
  render: h => h(App),
}).$mount('#app')