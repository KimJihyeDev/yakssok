<template>
    <div class="container">
        <div class="site-section mt-5">

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
                            <img src="/assets/images/vitamins.png" class="d-block w-100" alt="...">
                        </router-link>
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div class="carousel-item">
                        <router-link :to="{ name: 'category', params: { parent_id: 2, child_id: 1 }}">
                            <img src="/assets/images/pets.PNG" class="d-block w-100" alt="...">
                        </router-link>
                        <div class="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="/assets/images/notification.PNG" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
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

            <!-- 상품 리스트 -->
            <div class="row mt-5">
                <product 
                v-for="item in products" 
                :key="item.id" :val="item" 
                :likeCount="like" />
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="more" v-if="count > 12">더보기
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import store from '@/store'
    import { mapState, mapGetters } from 'vuex'
    import Product from './products/Product'
    /*eslint no-unused-vars: "error"*/
    export default {
        name: 'Main',
        data: function () {
            return {
                users: [],
                products: [],
                isLoaded: false,
                offSet: 0,
                count: 0,
                like: []
            }
        },
        components: {
            product: Product
        },
        methods: {
            more() {
                (async () => {
                    let response;
                    const id = store.getters.getId;
                    
                    if (!id) { // 로그인 되어 있지 않을 때
                        response =
                            await this.$axios.get(`${this.url}/products?offSet=${this.offSet}`);
                    } else { // 로그인 되어 있을 때
                        response =
                            await this.$axios.get(`${this.url}/products?offSet=${this.offSet}&id=${id}`);
                    }

                    const { code, message } = response.data;
                    const { rows, count, like } = response.data.products;

                    if (code === 200) {
                        if (rows.length > 0) {
                            this.count = count;
                            rows.forEach(product => {
                                this.products.push(product)
                            });
                            this.offSet++;
                            this.like = like;
                        } else if (rows.length < 1 && count != 0) {
                            alert('마지막 페이지입니다.');
                            return false;
                        }
                    } else {
                        alert(message);
                    }
                })();
            }
        },
        created: function () {
            // 처음 데이터를 불러올 때 
            // 서버에 현재 사용자 id를 건네줘야 한다
            // 그 id가 좋아요/싫어요를 한 사용자인지 확인
            this.more();
        },
        computed: {
            ...mapState(['url']),
            ...mapGetters({ path: 'productImagePath' }),
        },
        beforeRouteEnter(to, from, next) {
            (async () => {
                await store.dispatch('auth');
                next();
            })();
        }
    }
</script>
<style>
    /* 상품 리스트 이미지 조절 */
    .wine_v_1 img {
        width: auto;
        height: 400px;
    }
</style>