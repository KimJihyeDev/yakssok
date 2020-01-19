import Main from '../components/Main.vue'
import NotFound from '../components/NotFound.vue' // 404 error
import PharmacyMap from '../components/maps/PharmacyMap.vue'
import Facebook from '../components/Facebook.vue'
import CategoryList from '../components/products/CategoryList.vue'
import ProductDetail from '../components/products/ProductDetail.vue'

export default[
    {path:'*', component:NotFound},
    {path:'/', component:Main},
    {path:'/map', component:PharmacyMap},
    {path:'/facebook', component:Facebook},
    {path:'/category', component:CategoryList},
    {path:'/detail', component:ProductDetail},


]