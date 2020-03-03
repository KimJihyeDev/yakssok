// @는 src의 별칭
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import store from '@/store'
import axios from 'axios'

// 파라미터로 숫자만 받을 경우 (\\d+)로 패턴 지정.
const routes = [
    {
        path: '*',
        name: 'notfound',
        component: () => import('@/components/NotFound.vue')
    },
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/Main.vue')
    },
    {
        path: '/map',
        name: 'map',
        component: () => import('@/components/maps/PharmacyMap.vue'),
    },
    {
        path: '/facebook',
        name: 'facebook',
        component: () => import('@/components/Facebook.vue')
    },
    {
        path: '/product/detail/:id(\\d+)',
        name: 'detail',
        props: true,
        component: () => import('@/components/products/ProductDetail.vue'),
    },
    {
        path: '/product/search',
        name: 'search',
        props: (route) => ({ query: route.query.keyword }),
        component: () => import('@/components/products/SearchResult.vue'),
    },
    {
        path: '/product/category/:parent_id(\\d+)/:child_id(\\d+)',
        name: 'category',
        props: true,
        component: () => import('@/components/products/Category.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/users/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/components/users/Register.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { requireAuth: true },
        component: () => import('@/components/users/Profile.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/components/About.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('@/components/Chat.vue')
    },
]


const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

// 전역가드 설정
// 모든 라우트에서 사용
// main.js에서는 앱이 재시작 될 때마다만 토큰 확인이 가능하다.
// 중간에 브라우저에서 토큰을 삭제하거나, 
// 새로 고침이 없었을 때 토큰이 만료된 경우에는 대처X. 
// 모든 라우트 마다 확인하는게 가장 확실하다.
router.beforeEach((to, from, next) => {
    // 브라우저에서 token삭제한 경우 store에서 감지x
    // 절대로 store에서 확인하지X(여러번 실험했으니 그만해!!)
    
    const token = localStorage.getItem('YAKSSOK-TOKEN');
    console.log('beforeEach에서 토큰확인', token);
    // 토큰의 유무만 확인하여(유효성은 인증이 필수인 페이지에서만 체크)
    // 헤더에서 로그인 상태 결정(로그인, 로그아웃)
    store.commit('loginState', token);
    
    // 토큰은 크기가 크므로 
    // 인증이 반드시 필요한 경우에만 서버에서 토큰 확인을 받는다

    // 인증이 반드시 필요한 페이지(profile)
    // 비동기 문제로 여기서는 dispatch만 부르고 나머지는 인증이 필요한 페이지에서 처리
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 다음 라우트로 넘어갈지 말지는 무조건 여기서 정한다
        // store.state.isLogin === true
        //         ? next()
        //         : next({ name: 'login' })
        (async () => {
            if(token) {
                try{ 
                    // 반드시 headers로 보내야 한다
                    const config = { headers : { authorization: token } }
                    // 유저 정보에서 id(테이블 id)만 가져온다
                    const result = await axios.get(`${ store.state.url }/users/profile?type=p`, config)
                    const code = result.data.code;
                    if(code === 200) {
                        console.log('routeEach.서버에서 토큰확인.로그인 중.')
                        const { id, user_id, email } = result.data;
                        store.commit('profile', { id, user_id, email });
                        next();
                    } else {
                        // 토큰이 유효하지 않은 경우이므로 로그아웃 처리
                        localStorage.removeItem('YAKSSOK-TOKEN');
                        localStorage.removeItem('tokenAlarm');
                        store.state.token = null;
                        store.state.isLogin = false;
                        next('/login')
                    }
                    
                } catch(err) {
                    console.log(err);
                }
            } else {
                // 토큰이 없는 경우
                return next('/login');
            }   
        })();
    } else {
        console.log('인증불필요')
        next();
    }
})



export default router
