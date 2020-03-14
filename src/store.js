import 'babel-polyfill' // 브라우저 하위버전 지원을 위한 babel-polyfill
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import io from 'socket.io-client';

// 플러그인 등록
Vue.use(Vuex);

const store = new Vuex.Store({
    // data옵션에 해당하는 state
    state: {
        url: 'http://localhost:4000',
        // url: 'https://yakssokback.azurewebsites.net',
        id: '', // user테이블의 id(int)
        userId: '', // user_id. 실제 사용자 id
        productImagePath: '/images/products', // 제품 이미지 경로
        pictogramPath: '/images/pictograms', // 픽토그램 경로
        isLogin: false,
        isError: false,
        errorMessage: '', // 로그인 에러 메시지
        socketId: ''
    },
    getters: { // state의 데이터를 읽어주는 getter, computed와도 비슷(고로 return 필수?)
        productImagePath(state) {
            return state.url + state.productImagePath;
        },
        pictogramPath(state) {
            return state.url + state.pictogramPath;
        },
        getSocketId(state) {
            return state.socketId;
        },
        getloginState(state) {
            return state.isLogin;
        },
        getId(state) {
            return state.id;
        },
        auth(state) {
            return state.userId;
        },
        getEmail(state) {
            return state.email;
        }
    },
    
    // mutations는 동기적으로 작동한다
    mutations: {
        // 매개변수가 2개 이상일 때는 
        // 호출할 때도 받을 때도 반드시 { }로 묶어야 한다.
        login(state, { token, id }) {
            state.isLogin = true;
            state.isError = false;
            state.errorMessage = '';
            localStorage.setItem('YAKSSOK-TOKEN', token);
            state.id = id;
        },
        loginError(state, payload) {
            console.log(payload.data.message)
            state.isError = true;
            state.errorMessage = payload.data.message;
        },
        logout(state) {
            localStorage.removeItem('YAKSSOK-TOKEN');
            state.isLogin = false;
            state.id = '';
            state.userId = '';
        },
        auth(state, { id, user_id }) {
            console.log('mutations에서 id, user_id확인', id, user_id)
            // 토큰 유효성 확인 후
            state.id = id; // id(DB의 user 식별 id)
            state.userId = user_id;
            state.isLogin = true;
        },
        setSocketId(state, socketId) {
            state.socketId = socketId;
        },
        loginState(state, token) {
            // 라우트에서 로그인 확인용
            if (token)
                state.isLogin = true;
            else
                state.isLogin = false;
        }
    },
    actions: {
        auth({ state, commit }) {
            const token = localStorage.getItem('YAKSSOK-TOKEN');
            // 서버에 토큰 유효성을 검사받는다.
            // 토큰 없으면 서버에서 401에러(유효x) 처리되므로 따로 처리x
            return (async () => {
                try {
                    const config = { headers: { authorization: token } }
                    // 유저 정보에서 id(테이블 id)와 user_id를 가져온다
                    const result = await axios.get(`${state.url}/users/token`, config)
                    const code = result.data.code;
                    
                    if (code === 200) {
                        const { id, user_id } = result.data;
                        commit('auth', { id, user_id });
                    } else {
                        // 토큰이 없거나 유효하지 않은 경우이므로 로그아웃 처리
                        commit('logout');
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
                } catch (err) {
                    console.log(err);
                }
            })();
        },
        loginState({ commit }) {
            // 단순히 토큰의 유무만 확인(로그인, 로그아웃 출력용)
            const token = localStorage.getItem('YAKSSOK-TOKEN');
            return commit('loginState', token);
        },
    }
})

export default store;