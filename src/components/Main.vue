<template>
    <div class="container">
        <div class="site-section mt-5">
            <div class="container">
                <!-- carousel start -->
                <div class="owl-style">
                    <img class="mySlides intro-section container" src="/assets/images/hero_2.jpg">
                    <img class="mySlides intro-section container " src="/assets/images/hero_1.jpg">
                    <img class="mySlides intro-section container" src="/assets/images/img_1.jpg">
                    <a class="slide-pointer" id="left-pointer" v-on:click="plusDivs(-1)">❮</a>
                    <a class="slide-pointer" id="right-pointer" v-on:click="plusDivs(1)">❯</a>
                </div>
                <!-- carousel end -->
                <div class="row">
                    <!-- 상품리스트 시작 -->
                    <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in products"
                        :key="idx">
                        <div class="wine_v_1 text-center pb-4">
                            <router-link :to="`/detail/${item.id}`" class="thumbnail d-block mb-4"><img
                                    :src="`${path}/${item.product_image}`" alt="Image" class="img-fluid custom-img">
                            </router-link>
                            <div>
                                <h3 class="heading mb-1"><a href="#">{{item.product_name}}</a></h3>
                            </div>
                            <div class="wine-actions">
                                <h3 class="heading-2"><a href="#">{{item.product_name}}</a></h3>
                                <a class="btn add" type="button" style="background-color:rgb(252,252,252);"><img
                                        src="/assets/images/items/like.png"></a>
                                <span class="price">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*eslint no-unused-vars: "error"*/
    export default {
        name: 'Main',
        data: function () {
            return {
                test: this.$store.state.count,
                slideIndex: 1,
                result: {},
                users: [],
                path: `${this.$store.state.url}/images/products/`, // 이미지 가져오기 테스트
                products: [],
                imagePath: 'images/pictograms', // 이미지 경로
            }
        },
        components: {
        },
        methods: {
            plusDivs(n) {
                this.showDivs(this.slideIndex += n);
            },
            showDivs(n) {
                let i;
                const x = document.getElementsByClassName("mySlides");
                if (n > x.length) { this.slideIndex = 1 }
                if (n < 1) { this.slideIndex = x.length }
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                x[this.slideIndex - 1].style.display = "block"
            },
        },
        mounted: function () {
            this.showDivs(1);
        },
        created: function () {
            console.log('store=' + this.$store.state.count);
            (async () => {
                this.result = await this.$axios.get(this.$store.state.url + '/products');
                this.products = this.result.data;
            })();
        },
    }
</script>
<style>
    .custom-img {
        padding: 20%;
    }
</style>