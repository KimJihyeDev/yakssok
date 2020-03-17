<template>
  <div class="container">
    <div class="site-section mt-5">
      <div class="container">
        <div class="text-center">
          <h2 v-if="resultMessage">{{ resultMessage }}</h2>
        </div>
          <p class="h5" v-if="!resultMessage">{{ serchMessage }}</p>
        <div class="row">
          <!-- 상품리스트 시작 -->
          <div class="col-lg-3 mb-5 col-md-6" v-for="(item,idx) in searchResult" :key="idx">
              <div class="wine_v_1 text-center pb-4">
                <router-link :to="`/product/detail/${ item.id }`" class="thumbnail d-block mb-4"><img
                    :src="`${ productPath }/${item.product_image}`" v-on:load="loaded" alt="Image"
                    class="img-fluid custom-img">
                </router-link>
                <div>
                  <h3 class="heading mb-1"><label class="pointer text-black">{{ item.product_name }}</label></h3>
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
        resultMessage: '', 
        searchResult: [],
        isLoaded: false,
        count: '',
        serchMessage: ''
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
          const { code, message, result } = response.data;

          if (code === 200) {
            const { count, rows } = result;
            this.searchResult = rows;
            this.count = count;
            // 검색결과가 없으면 []이 온다. 빈배열은 false가 아니다
            // length가 0인지로 판단해야 한다.
            // if (this.count < 1)
            this.count < 1
              ? this.resultMessage = '검색결과가 없습니다'
              : this.serchMessage = `총 ${ this.count }개의 검색 결과가 있습니다`

          } else {
            alert(message);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    },
  }
</script>
<style>
  .custom-img {
    padding: 20%;
  }
</style>