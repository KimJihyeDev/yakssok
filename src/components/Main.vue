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
          <Product v-for="list in 6" v-bind:key="list" />
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
  /*eslint no-unused-vars: "error"*/
  import Product from './products/Product.vue'
  export default {
    name: 'Main',
    data: function () {
      return {
        slideIndex: 1,
      }
    },
    components: {
      Product
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
      // this.$parent.kakaomap();
    },
    created: function () {
    },
  }
</script>