// @는 src의 별칭
import VueRouter from 'vue-router'
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
        path: '/passwordreset',
        name: 'passwordreset',
        component: () => import('@/components/users/PasswordReset.vue')
    },
    {
        path: '/auth/:token',
        name: 'auth',
        component: () => import('@/components/users/Auth.vue')
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
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

// 전역가드 설정
router.beforeEach((to, from, next) => {
   
    // 토큰은 크기가 크므로 
    // 인증이 반드시 필요한 경우에만 서버에서 토큰 확인을 받는다.

    // 인증이 반드시 필요한 페이지(profile)
    if (to.matched.some(record => record.meta.requireAuth)) {
        (async () => {
            await store.dispatch('auth');
            const userId = store.getters.auth;
            console.log('id확인',userId);
            if(userId) {
                next();
            } else {
                next({ name: 'login' });
            }
        })();
    } else {
        // 인증이 불필요한 페이지
        store.dispatch('loginState')
        .then(
            next()
        );
    }
})

export default router
