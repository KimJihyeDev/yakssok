import 'babel-polyfill' // 브라우저 지원을 위한 babel-polyfill
import Vue from 'vue'
import Vuex from 'vuex'
// 플러그인 등록
Vue.use(Vuex);
// 상태 관리 전용 라이브러리 Vuex
// 이곳에 정의된 변수, 메소드는 애플리케이션 전역(모든 컴포넌트)에서 사용이 가능하다.

const store = new Vuex.Store({
    // data옵션에 해당하는 state
    state: {
        url:'http://localhost:4000',
        token: '',
        count:0,
        tokenState: ''

    },
    getters: {
        isLoggedIn(state){
            return state.token;
        },
        
    },
    // setter에 해당하는 mutations
    // **mutations 이외에서 state의 값을 변경해서는 안 된다**
    mutations: {

        increment(state){
            state.count++
        },
        logIn(state){
            state.token = localStorage.getItem('YAKSSOK-TOKEN');
        },
        logOut(state){
            localStorage.removeItem('YAKSSOK-TOKEN');
            state.token = '';
            // location.reload();
            this.$route.go('/');
        },
        validateToken(){
            // 서버의 응답을 처리한다.
            // 서버로부터 에러를 받은 경우, 토큰이 
        }
    }

})

export default store;