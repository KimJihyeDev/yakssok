import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import router from '@/router/routes'
import axios from 'axios'
import store from '@/store.js'
import io from 'socket.io-client';

// NavigationDuplicated error 처리
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

console.log('main.js파일')

Vue.use(VueRouter);
// axios 추가(전역변수로 사용)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.prototype.$store = store;

// 로그인 후 소켓연결
// const productSocket = io(`${ store.state.url }/product`, { transports: ['websocket'] });
const productSocket = io(`${ store.state.url }/product`);

Vue.prototype.$productSocket = productSocket;


productSocket.on('welcome',  (socketId) => {
  console.log('서버에서 받은소켓id', socketId);
  store.commit('setSocketId', socketId);
});

new Vue({
  store, 
  router,
  // 앱이 시작할 때마다 유저 id알아오기(웹소켓 연결)
  beforeCreate() { 
    productSocket.on('welcome',  (socketId) => {
      store.commit('setSocketId', socketId);
    });
  },
  render: h => h(App),
}).$mount('#app')