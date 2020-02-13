<template>
  <div>
    <div style="margin:80px 70px 0px 70px;">
      <p style="top:0px;margin:0px;padding:0;" class="col-md-6"> 카테고리 > {{ product_ingredients.parent_category | parent_category }} > {{ product_ingredients.child_category | child_category }} </p>
    </div>
    <!-- <div class="site-section mt-5" style="margin-top:0px !important;"> -->
    <div class="site-section mt-5 product">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="owl-style" style="text-align:center">
              <!-- 이미지수정 -->
              <img :src="`${$store.state.url}/${imagePath}/${product_ingredients.product_image}`" alt="Image" class="img-fluid" style="width:60%;height:60%;">
            </div>
          </div>
          <div class="col-lg-5 ml-auto">
            <h3 class="text-primary">{{ product_ingredients.product_name }}</h3>
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
            <h4 style="font-weight:900;color:#3d3935;">제품 상세</h4>
          </div>
          <hr>
          <!-- 왼쪽 정렬 시작 -->
          <div class="row " style="padding-left:1rem">
            <div class="col-lg-6">
              <strong class="headings">제품설명</strong>
              <p>{{ product_ingredients.product_desc }}</p>

            </div>
            <!--오른쪽 테이블시작 -->
            <div class="panel panel-default col-lg-5 ml-auto">
              <div class="panel-heading">
              </div>
              <!-- <div class="panel-body">
                <strong>영양성분표</strong>
              </div> -->
              <!-- Table -->
              <table class="table con-log-5">
                <tr style="background-color:#f3f3f3;">
                  <th class="in-table">영양성분표</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
                <tr>
                  <th class="in-table">1회분량</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th class="in-table">전체분량</th>
                  <th>&nbsp;</th>
                </tr>
                <tr>
                  <td> {{ product_ingredients.servings }} </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td> {{ product_ingredients.total_servings }}회</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <th class="in-table">1회 분량당</th>
                  <th>&nbsp;</th>
                  <th class="in-table">함량</th>
                  <th class="in-table">%영양소기준치</th>
                </tr>
                <tr v-for="(item,idx) in product_ingredients.ingredients" :key="idx">
                  <td>{{ item.ingredient}}</td>
                  <td>&nbsp;</td>
                  <td>{{ item.per_serving }}</td>
                  <td>{{ item.daily_value }}</td>
                  <!-- <td>탄수화물</td>
                  <td>&nbsp;</td>
                  <td>10mg</td>
                  <td>125%</td> -->
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
                <strong class="headings">복용법</strong>
                <p> {{ product_ingredients.suggested_use }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong class="headings">기타 성분</strong>
                <p style="margin-top:0px;"> {{ product_ingredients.other_ingredients }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong class="headings">주의 사항</strong>
                <p style="margin-top:0px;"> {{ product_ingredients.warnings }}</p>
              </div>
              <!-- 픽토그램 추가 -->
              <div>
                <!-- 이미지의 src를 v-bind로 처리해야지 vue를 적용할 수 있다. -->
                <img :src="`${$store.state.url}/${pictogramPath}/${item.image_path}`" v-for="(item,idx) in pictograms" :key="idx"  style="width:80px;">
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
      // id:this.$route.params.id,
      product_ingredients:[],  // 상품, 성분 정보
      pictograms:[],  // 픽토그램 정보
      imagePath:'images/products', // 상품 이미지 경로
      pictogramPath: 'images/pictograms' // 픽토그램 경로
    }
  },
  created(){
    // 경로를 직접 입력하여 들어간 경우 생명주기가 작동하지 않는걸로 보인다.
    // 동일한 컴포넌트 인스턴스가 재사용 되기 때문으로 보임.
    alert('created');
   (async() => {
     try{
        const result = await this.$axios.get(`${this.$store.state.url}/products/${this.$route.params.id}`)
        console.log(`${this.$store.state.url}/products/${this.$route.params.id}`);
        console.log(`결과`)
        console.log(result);
        this.product_ingredients = result.data.product_ingredients[0];
        this.pictograms = result.data.pictograms;
     }catch(err){
       console.log(err);
     }
   }

   )();
  },
  methods:{
    
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to);
  //     console.log(from);
  //     // this.$router.push(to.path);
  //     console.log(`가고자 하는 곳`)
  //     console.log(to.path)
  //     // this.$router.push(`{ name: 'detail', params: { id: 4 }}`);
  //     this.$router.go(to.path)
  //     // this.$router.push(`/map`);
  //   },
  // },
   beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    // 찾고자 하는 페이지가 없을 경우의 처리도 필요
    alert('update')
   next(this.$router.go(to.path));
      
  }, 
  beforeRouteEnter(to, from, next) {
    alert('beforerouterenter')
    next()
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
  /* 폰트 스타일 */
  .headings{
    font-weight:600;
    color:#3d3935;
    font-size:18px;
  }
  /* 테이블 폰트 */
  .in-table{
    color:#3d3935;
    font-weight:400;
  }

</style>