// @는 src의 별칭
import Main from '@/components/Main.vue'
import Login from  '@/components/users/Login.vue'
import Entry from  '@/components/users/Entry.vue'
import Profile from  '@/components/users/Profile.vue'
import NotFound from '@/components/NotFound.vue' // 404 error 처리
import PharmacyMap from '@/components/maps/PharmacyMap.vue'
import Facebook from '@/components/Facebook.vue'
import ProductDetail from '@/components/products/ProductDetail.vue'

// 파라미터로 숫자만 받을 경우 (\\d+)로 패턴 지정.
// 컴포넌트에서 $route를 직접 사용
export default[
    {path:'*', component:NotFound},
    {path:'/', component:Main},
    {path:'/map', component:PharmacyMap, name: 'map'},
    {path:'/facebook', component:Facebook},
    {path:'/detail/:id(\\d+)', component:ProductDetail, name:'detail'},
    {path:'/login',component:Login},
    {path:'/entry',component:Entry},
    {path:'/profile',component:Profile},


]