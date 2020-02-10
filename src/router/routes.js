// @는 src의 별칭
import Main from '@/components/Main.vue'
import Login from  '@/components/users/Login.vue'
import Entry from  '@/components/users/Entry.vue'
import NotFound from '@/components/NotFound.vue' // 404 error 처리
import PharmacyMap from '@/components/maps/PharmacyMap.vue'
import Facebook from '@/components/Facebook.vue'
import ProductDetail from '@/components/products/ProductDetail.vue'

export default[
    {path:'*', component:NotFound},
    {path:'/', component:Main},
    {path:'/map', component:PharmacyMap, name: 'map'},
    {path:'/facebook', component:Facebook},
    {path:'/detail/:id', component:ProductDetail, name:'detail'},
    {path:'/users/login',component:Login},
    {path:'/users/entry',component:Entry},


]