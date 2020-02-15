// @는 src의 별칭
import VueRouter from 'vue-router'

// 파라미터로 숫자만 받을 경우 (\\d+)로 패턴 지정.
const routes = [
    { 
        path: '*', 
        name: 'notfound',
        component: () => import('@/components/NotFound.vue')
    },
    { 
        path: '/', 
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
        name : 'chat',
        component: () => import('@/components/Chat.vue')
    },


]
const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })

export default router
