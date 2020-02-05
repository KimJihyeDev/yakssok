<template>
  <div>
    <div style="margin:70px 70px 0px 70px;">
      <p style="top:0px; margin:0px;"> 카테고리 > {{ product.parent_category | parent_category }} > {{ product.child_category | child_category }} </p>
    </div>
    <!-- <div class="site-section mt-5" style="margin-top:0px !important;"> -->
    <div class="site-section mt-5 product">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="owl-style" style="text-align:center">
              <!-- 이미지수정 -->
              <img :src="`${$store.state.url}/${imagePath}/${product.product_image}`" alt="Image" class="img-fluid" style="width:60%;height:60%;">
            </div>
          </div>
          <div class="col-lg-5 ml-auto">
            <h3 class="text-primary">{{ product.product_name }}</h3>
            <p>제조사: Now Foods</p>
            <h6>좋아요 위치</h6>
            <h6>해시태그 위치</h6>
            <input type="button" value="#noeggs" class="btn">
          </div>
        </div>
        <!-- 추가 -->
        <hr>
        <div class="border">
          <div style="margin-left:1em; margin-top:1em;">
            <strong>제품 상세</strong>
          </div>
          <hr>
          <!-- 왼쪽 정렬 시작 -->
          <div class="row " style="padding-left:1rem">
            <div class="col-lg-6">
              <strong>제품설명</strong>
              <p>{{ product.product_desc }}</p>

            </div>
            <!--오른쪽 테이블시작 -->
            <div class="panel panel-default col-lg-5 ml-auto">
              <div class="panel-heading">
              </div>
              <div class="panel-body">
                영양성분표
              </div>
              <!-- Table -->
              <table class="table con-log-5">
                <tr>
                  <td>1회분량</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>전체분량</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td> {{ product.servings }} </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td> {{ product.total_servings }}회</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>1회 분량당</td>
                  <td>&nbsp;</td>
                  <td>함량</td>
                  <td>%영양소기준치</td>
                </tr>
                <tr>
                  <td>탄수화물</td>
                  <td>&nbsp;</td>
                  <td>10mg</td>
                  <td>125%</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </table>
              <!-- 테이블 끝 -->
            </div>

            <!-- 테이블 끝 -->
            <!-- 정보에 따라 div 나누기. sugested user, warnings ... -->
            <div class="col-lg-6">
              <div style=" margin-top:1em;">
                <strong>복용법</strong>
                <p> {{ product.suggested_use }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong>기타 성분</strong>
                <p style="margin-top:0px;"> {{ product.other_ingredients }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong>주의 사항</strong>
                <p style="margin-top:0px;"> {{ product.warnings }}</p>
              </div>
              <!-- 픽토그램 추가 -->
              <div>
                <img src="/assets/images/pictogram/store_01.jpg" style="width:80px;">
              </div>
              <!-- 픽토그램 끝 -->
            </div>
            <!-- 왼쪽 정렬 끝 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ProductDetail',
  data(){
    return {
      product:{},
      imagePath:'images/products',
    }
  },
  created(){
    // 경로를 직접 입력하여 들어간 경우 생명주기가 작동하지 않는걸로 보인다.
    // 동일한 컴포넌트 인스턴스가 재사용 되기 때문으로 보임.
    // alert('created');
   (async() => {
     try{
        const result = await this.$axios.get(`${this.$store.state.url}/products/${this.$route.params.id}`)
        console.log(`${this.$store.state.url}/products/${this.$route.params.id}`);
        console.log(result);
        this.product = result.data;
        console.log(this.product);
     }catch(err){
       console.log(err);
     }
   }

   )();
  },
  methods:{
    
  },
  filters:{
    parent_category(val){
      if(val === 1){
        val = '영양제'
        return val;
      }else{
        val = '동물영양제' 
        return val;
      }
    },
    child_category(val){
      if(val === 1){
        val= '비타민';
        return val;
      }else{
        val = '프로바이오틱스';
        return val;
      }
    }
  }  
}
</script>

<style>
  .product {
    margin-top: 0px !important;
  }
  .table td {
    padding: 0.2rem;
  }
</style>