import Main from '../components/Main.vue'
import NotFound from '../components/NotFound.vue' // 404 error
import PharmacyMap from '../components/maps/PharmacyMap.vue'

export default[
    {path:'*', component:NotFound},
    {path:'/', component:Main},
    {path:'/map', component:PharmacyMap},


]