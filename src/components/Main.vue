<template>
    <div class="container">
        <div class="site-section mt-5">
            <div class="container">
                <!-- carousel start -->
                <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <router-link :to="{ name: 'category', params: { parent_id: 1, child_id: 1 }}">
                                <img src="/assets/images/vitamins.PNG" class="d-block w-100" alt="...">
                            </router-link>
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>First slide label</h5> -->
                                <!-- <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> -->
                            </div>
                        </div>
                        <div class="carousel-item">
                            <router-link :to="{ name: 'category', params: { parent_id: 2, child_id: 1 }}">
                                <img src="/assets/images/pets.PNG" class="d-block w-100" alt="...">
                            </router-link>
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>Second slide label</h5> -->
                                <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> -->
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/notification.PNG" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>Third slide label</h5> -->
                                <!-- <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> -->
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <!-- carousel end -->
                
                <div class="row">
                    <!-- products list start -->
                    <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in products"
                        :key="idx">
                        <div class="wine_v_1 text-center pb-4">
                            <router-link :to=" { name: 'detail', params: { id: item.id } }"
                                class="thumbnail d-block mb-4"><img :src="`${ path }/${ item.product_image }`"
                                    v-on:load="loaded" alt="Image" class="img-fluid custom-img">
                            </router-link>
                            <div>
                                <h3 class="heading mb-1"><a href="#">{{ item.product_name }}</a></h3>
                            </div>
                            <!-- <div class="wine-actions">
                                <h3 class="heading-2"><a href="#">{{ item.product_name }}</a></h3>
                                <span class="price" style="margin-left:0.3rem">0</span>
                                <a href="#" onclick="return false;"><i class="fa fa-thumbs-up" aria-hidden="true"
                                        style="color:lightgray"></i></a>
                                <a href="#" onclick="return false;" style="margin-left:1rem"><i
                                        class="fa fa-thumbs-down" aria-hidden="true" style="color:lightgray"></i></a>
                                <span class="price" style="margin-left:0.3rem">0</span>
                            </div> -->
                        </div>
                    </div>
                    <!-- products list end -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import store from '@/store'
    import { mapState, mapGetters } from 'vuex'
    /*eslint no-unused-vars: "error"*/
    export default {
        name: 'Main',
        data: function () {
            return {
                users: [],
                products: [],
                isLoaded: false,
                rate: ''
            }
        },
        created: function () {
            (async () => {
                const result = await this.$axios.get(`${this.url}/products`);
                this.products = result.data;
            })();
        },
        computed: {
            ...mapState(['url']),
            ...mapGetters({ path: 'productImagePath' }),
        },
        methods: {
            loaded(){
                this.isLoaded = true;
             },
        },
    }
</script>
<style>
    .custom-img {
        padding: 20%;
    }
    /* carousel 사이즈 조절 */
    .carousel-item img {
        /* width: auto;
        height: 500px; */
    }
    /* 상품 리스트 이미지 조절 */
    .wine_v_1 img {
        width:auto;
        height:400px;
    }
</style>