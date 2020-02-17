import 'babel-polyfill' // 브라우저 하위버전 지원을 위한 babel-polyfill
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// 플러그인 등록
Vue.use(Vuex);
// 상태 관리 전용 라이브러리 Vuex
// 이곳에 정의된 변수, 메소드는 애플리케이션 전역(모든 컴포넌트)에서 사용이 가능하다.

const store = new Vuex.Store({
    // data옵션에 해당하는 state
    state: {
        url: 'http://localhost:4000',
        productImagePath: '/images/products',
        pictogramImagePath: '/images/pictograms',
        token: '',
        tokenState: '',
        isLoggedIn: false,
        router: {}


    },
    getters: { // state의 데이터를 읽어주는 getter, computed와도 비슷(고로 return 필수?)
        productImagePath(state){
            return state.url + state.productImagePath;
        },
        pictogramImagePath(state){
            return state.url + state.pictogramImagePath;
        },
        isLoggedIn(state){ // 토큰의 유무를 확인
            return state.isLoggedIn;
        },
        confirmToken(state){ // 토큰의 유효성을 확인
            return state.tokenState;
        }
    },
    // setter에 해당하는 mutations
    // **mutations 이외에서 state의 값을 변경해서는 안 된다**
    // state와 payload라는 2개의 매개변수를 받을 수 있다.
    // commit은 mutations를 호출하는 방법. store.commit('mutations명',payload);
    // payload는 mutations를 호출할 때의 commit에서 전해준 매개변수
    mutations: {
        logIn(state){
            state.token = localStorage.getItem('YAKSSOK-TOKEN');
            state.isLoggedIn = true;
            // state.router.push('/');
            // location.reload();
        },
        logOut(state){
            localStorage.removeItem('YAKSSOK-TOKEN');
            state.token = '';
            state.isLoggedIn = false;
            state.router.push('/');
            // location.reload();
        },
        validateToken(state, payload){
            // token 인증이 필요한 페이지에서 사용
            let token = store.state.tokenState;
                        switch (payload) {
                            case 401: // 토큰이 유효하지 않은 경우
                                token = 401;
                                break;
                            case 419: // 토큰이 만료된 경우
                                token = 419;
                                break;
                            case 200: // 정상적으로 인증된 경우
                                token = 200;
                                break;
                        }
                        console.log('코드결과')
                        console.log(token);
                        // if(token === 419 || token === 401){
                            
                        // }

            // 
        }
    }

})

export default store;