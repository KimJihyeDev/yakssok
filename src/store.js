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
    // data옵션에 해당하는 state
    state: {
        url: 'http://localhost:4000',
        id: '', // 사용자 id(int)
        userId: '', // user id
        productImagePath: '/images/products',
        pictogramImagePath: '/images/pictograms',
        token: null, // 토큰이 없으면 로그아웃 상태로 변환시키기
        isLogin: false,
        isError: false,  
        errorMessage: '', // 로그인 에러 메시지
        // loginState: '로그인',
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
            // 스토어 초기화, 소켓 접속을 위해 go로 이동
            router.go(-1);
        },
        loginError(state, payload){
            console.log(payload.data.message)
            state.isError = true;
            state.errorMessage = payload.data.message;
        },
        logout(state){
            localStorage.removeItem('YAKSSOK-TOKEN');
            state.token = null;
            state.isLogin = false;
            router.push('/');

        },
        profile(state, payload){
            let { user_id, email } = payload;
            state.userId = user_id;  // user id
            state.userProfile.email = email;
        },
        getUserId(state, payload){
            state.id = payload; // id(DB의 user 식별 id)
        },
        setToken(state) {
            state.token = localStorage.getItem('YAKSSOK-TOKEN')
        },
        setSoketId(state, payload) {
            state.socketId = payload;
        }
    },
    actions: {
        login({ state, commit }, user){
            (async () => {
                try{
                    // console.log(Date.now())
                    const result = await axios.post(`${ state.url }/users/login`, user)
                    console.log(result);
                    let code = result.data.code;
                    if(code === 200){
                        const token = result.data.token;
                        commit('login', token);
                    }
                    else if(code === 403 || code === 500){
                        commit('loginError', result);
                        console.log(result.data.message)                        
                    }       
                }catch(err){
                    console.log(err);
                }
            })();
        },
        userProfile({ state, commit }){
            // 토큰 정보로 로그인
             // header의 token을 browser의 network에서 확인해보자
       
            (async () => {
                let token = localStorage.getItem('YAKSSOK-TOKEN');
                // 반드시 headers로 보내야 한다
                const config = { headers : { authorization: token } }
                
                try{ 
                    // query의 type=p 이면 profile을 가져오고, i이면 id만 가져온다
                    // id만 가져오는건 소켓 연결을 위해 사용자 id를 확인하기 위해서.
                    const result = await axios.get(`${ state.url }/users/profile?type=p`, config)
                    console.log(result);
                    commit('profile', result)
                } catch(err) {
                    console.log(err);
                }
            })();
        },
        // eslint-disable-next-line no-unused-vars
        getUserId({ state, commit }, socket_id){ 
            // 로그아웃 후에 페이지를 새로 고치지 않을거면(go)
            // 이 과정을 로그인에서 불러줘야 한다
            (async () => {
                let token = localStorage.getItem('YAKSSOK-TOKEN');
                // 로그인 되어 있지 않은 경우(토큰이 없는 경우)는 소켓연결X
                // 반드시 headers로 보내야 한다
                const config = { headers : { authorization: token } }
                if(token) {
                    try{ 
                        console.log('로그인 되어 있습니다.')
                        // 유저 정보에서 id만 가져온다
                        const result = await axios.get(`${ state.url }/users/profile?type=i`, config)
                        const id = result.data.id;
                        
                        commit('getUserId', id)
                        
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
                    console.log('로그인 되어 있지 않으므로 소켓에 연결하지 않습니다.');
                }   
            })();

        }
    }
})

export default store;