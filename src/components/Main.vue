<template>
    <div class="container">
        <div class="site-section mt-5">
            <div class="container">

                <!-- <div class="row mb-5">
            <div class="col-12 section-title text-center mb-5">
              <h2 class="d-block">Our Products</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, perspiciatis!</p>
              <p><a href="#">View All Products <span class="icon-long-arrow-right"></span></a></p>
            </div>
          </div> -->
                <!-- 문제1. router-link로 이동했을 시에 carousel이 뜨지 않는 문제 발생  -->
                <!-- 문제2. js 파일을 읽어와도 처음 로딩시 정상적으로 출력되지 않음  -->
                <!-- 해결: 직접 만든 carousel로 대체 & vue로 carousel 제어 -->

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
                    <!-- 이미지 가져오기 테스트 -->
                    <!-- <img v-bind:src="this.path"> -->
                    <!-- {{this.path}} -->
                    <!-- <Product v-for="list in 6" v-bind:key="list" /> -->
                    <!-- 상품리스트 시작 -->
                    <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in products" :key="idx">
                        <div class="wine_v_1 text-center pb-4">
                            <!-- 라우터 이동은 페이지 이동과 정의 방식이 다르다.  -->
                            <!-- 페이지 이동 방식이 detail?id=....식으로 파라미터를 정의하였다면  -->
                            <!-- 라우터 이동 방식은 detail/id값 의 식으로 파라미터를 던져준다. -->
                            <!-- <router-link :to="`/detail?id=${item.id}`" class="thumbnail d-block mb-4"><img :src="`${path}/${item.product_image}`" -->
                            <router-link :to="`/detail/${item.id}`" class="thumbnail d-block mb-4"><img :src="`${path}/${item.product_image}`"
                                    alt="Image" class="img-fluid custom-img"></router-link>
                                    <!-- v-bind:href="'/boards/modify.html?id='+board.id" -->
                            <div>
                                <h3 class="heading mb-1"><a href="#">{{item.product_name}}</a></h3>
                                <!-- <span class="price">$629.00</span> -->
                            </div>


                            <div class="wine-actions">

                                <!-- <h3 class="heading-2"><a href="#">{{item.product_name}}</a></h3> -->
                                <h3 class="heading-2"><a href="#">{{item.product_name}}</a></h3>
                                <!-- html에서도 store에 접근이 가능하다!! -->
                                <!-- this 키워드 없이 사용할 것! -->
                                <!-- <a :href="`${$store.state.url}/${imagePath}/formulation-liquid.jpg}`">링크이동</a> -->
                                <!-- <span class="price d-block"><del>$900.00</del> $629.00</span> -->

                                <!-- <a href="#" class="btn add"><span class="icon-shopping-bag mr-3"></span> Add to Cart</a> -->
                                <a class="btn add" type="button"
                                    style="background-color:rgb(252,252,252);"><img src="/assets/images/items/like.png"
                                        ></a>
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
    // const imagePath = process.env.VUE_APP_PRODUCT_IMAGE; 
    export default {
        name: 'Main',
        data: function () {
            return {
                test: this.$store.state.count,
                slideIndex: 1,
                result: {},
                users: [],
                path: `${this.$store.state.url}/images/products/` , // 이미지 가져오기 테스트
                products: [],
                imagePath:'images/pictograms' // 이미지 경로
            }
        },
        components: {
        },
        methods: {
            // increment(){  // store 테스트
            //   this.$store.commit('increment');
            //   console.log(this.$store.state.count);
            // },
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
            // this.$parent.kakaomap();
        },
        created: function () {
            // this.$axios(this.$url+'/users')
            //   .then((result)=>{
            //       console.log(result);
            //       console.log(result.data);
            //       this.users = result.data;
            //   })
            console.log('store=' + this.$store.state.count);
            (async () => {
                this.result = await this.$axios.get(this.$store.state.url + '/products');
                let test = await this.$axios(this.$store.state.url + '/products/3');
                console.log(`여기선 왜 되는건데??`)
                console.log(test);
                this.products = this.result.data;
                console.log(this.result);
                console.log(this.products);

            })();


        },
    }
</script>
<style>
.custom-img {
  padding: 20%;
}
</style>