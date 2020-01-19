<template>
    <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;">
        <div class="wine_v_1 text-center pb-4">
          <router-link to="/detail" class="thumbnail d-block mb-4"><img v-bind:src="this.img_path" alt="Image" class="img-fluid custom-img"></router-link>
          <div>
            <h3 class="heading mb-1"><a href="#">Trius Cabernet France 2011</a></h3>
            <span class="price">$629.00</span>
          </div>
          

          <div class="wine-actions">
              
            <h3 class="heading-2"><a href="#">Trius Cabernet France 2011</a></h3>
            <span class="price d-block"><del>$900.00</del> $629.00</span>
            
            <div class="rating">
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star"></span>
              <span class="icon-star-o"></span>
            </div>
            
            <a href="#" class="btn add"><span class="icon-shopping-bag mr-3"></span> Add to Cart</a>
          </div>
        </div>
      </div>


</template>

<script>
export default{
    name:'Product',
    data:function(){
      return {
        img_path: process.env.VUE_APP_IMAGEPATH  +'/vitamin_a.png' // 이미지 경로
      }
    }
}
</script>

<style scoped>
.custom-img {
  padding: 20%;
}

</style>