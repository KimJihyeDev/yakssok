<template>
  <div class="container">
    <div class="site-section mt-5">
      <div class="container">
        <div class="row">
          <!-- 상품리스트 시작 -->
          <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in products" :key="idx">
            <div class="wine_v_1 text-center pb-4">
              <router-link :to="`/product/detail/${ item.id }`" class="thumbnail d-block mb-4"><img
                  :src="`${ productPath }/${item.product_image}`" v-on:load="loaded" alt="Image" class="img-fluid custom-img">
              </router-link>
              <div>
                <h3 class="heading mb-1"><a href="#">{{ item.product_name }}</a></h3>
              </div>
              <div class="wine-actions">
                <h3 class="heading-2"><a href="#">{{ item.product_name }}</a></h3>
                <a href="#" onclick="return false;"><i class="fa fa-thumbs-up" aria-hidden="true"
                    style="color:lightgray"></i></a>
                <span class="price" style="margin-left:0.3rem">0</span>
                <a href="#" onclick="return false;" style="margin-left:1rem"><i class="fa fa-thumbs-down"
                    aria-hidden="true" style="color:lightgray"></i></a>
                <span class="price" style="margin-left:0.3rem">0</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-primary btn-lg btn-block" @click="more">더보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  /*eslint no-unused-vars: "error"*/
  export default {
    name: 'Category',
    data: function () {
      return {
        products: [],
        offSet: 0, // 더보기 계산용 변수
        isLoaded: false,
      }
    },
    methods: {
        loaded(){
        // 화면 로드가 끝난 후에 이미지 보여주기(로드 전 이미지 보이는걸 방지)
            this.isLoaded = true;
        },
      more() { // 더보기 버튼용 메소드
        (async () => {
          const result = await this.$axios.get(`
                  ${ this.url}/products/categories/${this.$route.params.parent_id}/${this.$route.params.child_id}
                  ?offSet=${ this.offSet}`
          );
          console.log('결과배열길이')
          console.log(result.data.length);
          if (result.data.length !== 0) {
            result.data.forEach(product => {
              this.products.push(product)
            });
            this.offSet++;
          } else {
            alert('마지막 페이지입니다.');
            return false;
          }
        })();
      }
    },
    computed: {
      ...mapState(['url']),
      ...mapGetters({ productPath: 'productImagePath' })
    },
    created() {
      (async () => {
        const result = await this.$axios.get(`
                  ${ this.url}/products/categories/${this.$route.params.parent_id}/${this.$route.params.child_id}
                  ?offSet=${ this.offSet}`
        );
        console.log(result);
        this.products = result.data;
        this.offSet++;
      })();
    },
    beforeRouteUpdate(to, from, next) {
      // go는 브라우저 차원의 이동
      // next()후에 go를 해야 이동이 되네?
      // 파라미터를 직접 입력할 때는
      //  next(this.$router.go(to.path))로 이동이 되지만
      // 클릭으로 이동할 때는
      // next(); this.$router.go(to.path)로만 이동된다
      // push는 에러나면서 이동X 
      next();
      this.$router.go(to.path)
    },
  }
</script>
<style>
  .custom-img {
    padding: 20%;
  }
</style>