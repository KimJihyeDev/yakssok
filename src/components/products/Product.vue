<template>
    <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;">
        <div class="wine_v_1 text-center pb-4">
          <router-link to="/detail" class="thumbnail d-block mb-4"><img v-bind:src="this.product_img" alt="Image" class="img-fluid custom-img"></router-link>
          <div>
            <h3 class="heading mb-1"><a href="#">Trius Cabernet France 2011</a></h3>
            <!-- <span class="price">$629.00</span> -->
          </div>
          

          <div class="wine-actions">
              
            <h3 class="heading-2"><a href="#">Trius Cabernet France 2011</a></h3>
            <!-- <span class="price d-block"><del>$900.00</del> $629.00</span> -->
            
            <div class="rating">
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star-o"></span>
            </div>
            
            <!-- <a href="#" class="btn add"><span class="icon-shopping-bag mr-3"></span> Add to Cart</a> -->
            <a class="btn add" type="button"  v-on:click="like" style="background-color:rgb(252,252,252);"><img v-bind:src= "this.like_img" v-on:clidk="like()" ></a>
            <span class="price">0</span>
          </div>
        </div>
      </div>


</template>

<script>
export default{
    name:'Product',
    data:function(){
      return {
        product_img: process.env.VUE_APP_IMAGEPATH  +'/vitamin_a.png', // 이미지 경로
        like_img: process.env.VUE_APP_IMAGEPATH + "/like.png"   // like 이미지
      }
    },
    methods:{
      like:function(){
        this.like_img = process.env.VUE_APP_IMAGEPATH + "/like_clicked.png"
      }
    }
}
</script>

<style scoped>
.custom-img {
  padding: 20%;
}

</style>