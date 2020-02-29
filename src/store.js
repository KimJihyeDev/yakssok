import 'babel-polyfill' // 브라우저 하위버전 지원을 위한 babel-polyfill
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/routes'
// import io from 'socket.io-client';


// 플러그인 등록
Vue.use(Vuex);
// 상태 관리 전용 라이브러리 Vuex
// 이곳에 정의된 변수, 메소드는 애플리케이션 전역(모든 컴포넌트)에서 사용이 가능하다.

// state, mutations... 을 각각 모듈로 만든 후 vuex 객체 선언할

const store = new Vuex.Store({
    // https://yakssokfront.z32.web.core.windows.net/ 프론트
    // data옵션에 해당하는 state
    // https://yakssokback.azurewebsites.net 백
    state: {
        url: 'http://localhost:4000',
        id: '', // user테이블의 id(int)
        userId: '', // user id
        productImagePath: '/images/products',
        pictogramImagePath: '/images/pictograms',
        // token: null, // 토큰이 없으면 로그아웃 상태로 변환시키기
        isLogin: false,
        isError: false, 
        errorMessage: '', // 로그인 에러 메시지
        userProfile: {
            email: ''
        },
        socketId: ''
    },
    getters: { // state의 데이터를 읽어주는 getter, computed와도 비슷(고로 return 필수?)
        productImagePath(state){
            return state.url + state.productImagePath;
        },
        pictogramImagePath(state){
            return state.url + state.pictogramImagePath;
        },
    },
    // setter에 해당하는 mutations
    // **mutations 이외에서 state의 값을 변경해서는 안 된다**
    // state와 payload라는 2개의 매개변수를 받을 수 있다.
    // commit은 mutations를 호출하는 방법. store.commit('mutations명',payload);
    // payload는 mutations를 호출할 때의 commit에서 전해준 매개변수
    // mutations는 동기적으로 작동한다(비동기적 처리는 모두 actions에서 처리)
    mutations: {
        login(state, token, id){
            state.isLogin = true;
            state.isError = false;
            state.errorMessage = '';
            localStorage.setItem('YAKSSOK-TOKEN', token);
            state.userId = id;
            // 로그인 이전에 보던 페이지로 이동
            router.go(-1);
        },
        loginError(state, payload){
            console.log(payload.data.message)
            state.isError = true;
            state.errorMessage = payload.data.message;
        },
        logout(state){
            localStorage.removeItem('YAKSSOK-TOKEN');
            localStorage.removeItem('tokenAlarm');
            state.isLogin = false;
            router.push('/');

        },
        profile(state, payload){
            state.userId = payload.user_id;  // user id
            state.userProfile.email = payload.email;
            // 여기서 router push하면 무조건 무한반복
            // router.push('profile');
        },
        getUserId(state, id){
            state.id = id; // id(DB의 user 식별 id)
            state.isLogin = true;
        },
        setSoketId(state, payload) {
            state.socketId = payload;
        },
        loginState(state, token) { 
            // 라우트에서 로그인 확인용
            if(token) 
                state.isLogin = true;
            else 
                state.isLogin = false;
        }
    },
    actions: {
        login({ state, commit }, user){
            (async () => {
                try{    
                    const result = await axios.post(`${ state.url }/users/login`, user)
                    console.log(result);
                    let code = result.data.code;
                    if(code === 200){
                        const token = result.data.token;
                        // 2시간 후에 자동으로 토큰 삭제 & 로그아웃 처리
                        localStorage.setItem('tokenAlarm', result.data.time);
                        commit('login', token);
                    }
                    else {
                        commit('loginError', result);
                        console.log(result.data.message)                        
                    }       
                }catch(err){
                    console.log(err);
                }
            })();
        }, 
        // eslint-disable-next-line no-unused-vars
        // 앱이 재시작 될 때마다 main.js에서 token의 유무 검사
        getUserId({ state, commit }){ 
            const token = localStorage.getItem('YAKSSOK-TOKEN');
            // 서버에 토큰 유효성을 검사받는다.
            (async () => {
                if(token) {
                    try{ 
                        // 반드시 headers로 보내야 한다
                        const config = { headers : { authorization: token } }
                        // 유저 정보에서 id(테이블 id)만 가져온다
                        const result = await axios.get(`${ state.url }/users/profile?type=i`, config)
                        const code = result.data.code;
                        if(code === 200) {
                            console.log('서버에서 토큰확인 완료. 로그인 중.')
                            const id = result.data.id;
                            commit('getUserId', id);
                        } else {
                            // 토큰이 유효하지 않은 경우이므로 로그아웃 처리
                            localStorage.removeItem('YAKSSOK-TOKEN');
                            localStorage.removeItem('tokenAlarm');
                            state.token = null;
                            state.isLogin = false;
                        }
                        
                        // 채팅 소켓 연결(나중에 사용 예정)
                        // const chatSocket = io(`${store.state.url}/chat`);

                        // chatSocket.emit('setUser', socket_id, id);
                         // 채팅방 가입
                        //  chatSocket.on('join', (message) => {
                        //     console.log('채팅방에 가입')
                        //     console.log(message)
                        //     chatSocket.emit('hi', '채팅가입했어요');
                        // })
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    // 토큰이 없는 경우
                    // console.log('state.verifyToken확인', state.verifyToken);
                    return null;
                }   
            })();

        },
        // autoLogout({ commit }) {
        //     // 토큰의 유효시간을 클라이언트에서 확인하고 
        //     // 유효시간이 지나면 자동 로그아웃 처리한다.
        //     const token = localStorage.getItem('YAKSSOK-TOKEN');
        //     const alarm = localStorage.getItem('tokenAlarm');
        //     const time = Date.now();
        //     console.log('현재시각', time);
        //     console.log('토큰 알람!!', alarm);
        //    if(token) {
        //         if(time > alarm) {
        //             alert('로그인 시간을 초과하여 자동 로그아웃 되었습니다.');
        //             commit('logout');
        //         } else {
        //             commit('setToken');
        //         }
        //    } else {
        //         return null;
        //    }
        // },
        profile({ state, commit }, token){
            (async () => {
                // 로그인 되어 있지 않은 경우(토큰이 없는 경우)는 소켓연결X
                // 반드시 headers로 보내야 한다
                const config = { headers : { authorization: token } }
                    try{ 
                        const result = await axios.get(`${ state.url }/users/profile?type=p`, config)
                        const code = result.data.code;
                        console.log('프로필 요청결과')
                        console.log(result);
                        const payload = result.data;
                        if(code === 200) {
                            console.log('서버에서 토큰확인 완료. 로그인 중.')
                            commit('profile', payload);
                        } else {
                            console.log('토큰이 유효하지 않음')
                            localStorage.removeItem('YAKSSOK-TOKEN');
                            localStorage.removeItem('tokenAlarm');
                            state.token = null;
                            state.isLogin = false;
                            router.push({ name: 'login'});
                        }
                    } catch(err) {
                        console.log(err);
                    }
            })();
            
        }
    
    }
})

export default store;