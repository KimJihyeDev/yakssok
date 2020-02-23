// @는 src의 별칭
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import store from '@/store'

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
        component: () => import('@/components/products/ProductDetail.vue'),
    },
    {
        path: '/product/category/:parent_id(\\d+)/:child_id(\\d+)',
        name: 'category',
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
        path: '/chat',
        name: 'chat',
        component: () => import('@/components/Chat.vue')
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

// 전역가드 설정
// 모든 라우트에서 사용
router.beforeEach((to, from, next) => {
    // 브라우저에서 token삭제한 경우 store에서 감지x
    
    // 모든 라우트마다 토큰확인
    store.commit('setToken');
    let token = store.state.token;
    console.log('beforeEach에서 store의 token확인')
    console.log(token)
    store.dispatch('getUserId');
        if(to.matched.some(record => record.meta.requireAuth)){
            if(token === null ){
                next({ name: 'login'});
            } else {
                next(); 
            }
        }
        else {
            next();
        }
})



export default router
