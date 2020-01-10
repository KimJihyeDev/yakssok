<template>
  <div>
    <div class="owl-carousel hero-slide owl-style">
      <div class="intro-section container" style="background-image: url('/assets/images/hero_1.jpg');">
        <div class="row justify-content-center text-center align-items-center">
          <div class="col-md-8">
            <span class="sub-title">Royal Wine</span>
            <h1>Grape Wine</h1>
          </div>
        </div>
      </div>

      <div class="intro-section container" style="background-image: url('/assets/images/hero_2.jpg');">
        <div class="row justify-content-center text-center align-items-center">
          <div class="col-md-8">
            <span class="sub-title">Welcome</span>
            <h1>Wines For Everyone</h1>
          </div>
        </div>
      </div>

    </div>

    <div class="site-section mt-5">
      <div class="container">

        <div class="row mb-5">
          <div class="col-12 section-title text-center mb-5">
            <h2 class="d-block">Our Products</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, perspiciatis!</p>
            <p><a href="#">View All Products <span class="icon-long-arrow-right"></span></a></p>
          </div>
        </div>
        <div class="row">
          <Item/>
          <Item/>
          <Item/>
          <Item/>
          <Item/>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Item from './items/Item.vue'

export default {
  name: 'Main',
  data:function(){
    return{
      message:'초기값',

    }
  },
  components:{
    Item
  },
  methods:{
    change(){
      this.message = '변경된 메시지'
    }
  },
  mounted:function(){
  },
  created:function(){
  },

}
</script>

<!-- <script>
  alert('script after');
</script> -->

<style scoped>
</style>
