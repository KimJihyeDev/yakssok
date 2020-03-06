<template>
  <div class="container">
    <div class="site-section mt-5">
      <div class="container">
        <div class="text-center">
          <h2 v-if="resultMessage">{{ resultMessage }}</h2>
        </div>
        <div class="row" v-if="!resultMessage">
          <!-- 상품리스트 시작 -->
          <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in searchResult" :key="idx">
            <div class="wine_v_1 text-center pb-4">
              <router-link :to="`/product/detail/${ item.id }`" class="thumbnail d-block mb-4"><img
                  :src="`${ productPath }/${item.product_image}`" v-on:load="loaded" alt="Image"
                  class="img-fluid custom-img" style="max-height:20rem;width:auto;height:auto;">
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
          <!-- 검색결과가 12개가 넘을 경우 -->
        <!-- <div>
          <button type="button" class="btn btn-primary btn-lg btn-block" @click="more">더보기</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'search',
    data() {
      return {
        resultMessage: '', //
        searchResult: [],
        isLoaded: false,
      }
    },
    methods: {
      loaded() {
        // 화면 로드가 끝난 후에 이미지 보여주기(로드 전 이미지 보이는걸 방지)
        this.isLoaded = true;
      },
    },
    computed: {
      ...mapState(['url']),
      ...mapGetters({ productPath: 'productImagePath' })
    },
    created() {
      // header에서 넘겨받은 query로 검색 실행
      (async () => {
        try {
          const keyword = this.$route.query.keyword;
          const response
            = await this.$axios.get(`${this.url}/products/search?keyword=${ keyword }`);
          console.log('검색결과', response);
          const { code, message, result } = response.data;

          if (code === 200) {
            this.searchResult = result;
            // 검색결과가 없으면 []이 온다. 빈배열은 false가 아니다
            // length가 0인지로 판단해야 한다.
            if (this.searchResult.length < 1)
              this.resultMessage = '검색결과가 없습니다';
          } else {
            alert(message);
          }
        } catch (err) {
          console.log(err);
        }
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
    }
  }
</script>
<style>
  .custom-img {
    padding: 20%;
  }
</style>