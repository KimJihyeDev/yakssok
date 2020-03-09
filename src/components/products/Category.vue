<template>
  <div class="container">
    <div class="site-section mt-5">
          <label v-if="isLoaded">총 {{ count }}개의 제품이 등록되어 있습니다.</label>
      <div class="container">
        <div class="row">
          <!-- 상품리스트 시작 -->
          <div class="col-lg-3 mb-5 col-md-6" style="margin-top:0px;" v-for="(item,idx) in products" :key="idx">
            <div class="wine_v_1 text-center pb-4">
              <router-link :to="`/product/detail/${ item.id }`" class="thumbnail d-block mb-4"><img
                  :src="`${ productPath }/${item.product_image}`" v-on:load="loaded" alt="Image"
                  class="img-fluid custom-img">
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
          <button type="button" class="btn btn-primary btn-lg btn-block" @click="more" v-if="count > 12">더보기</button>
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
        count: 0, // 전체 상품개수용 변수(더보기 버튼 활성화 여부)
      }
    },
    methods: {
      loaded() {
        // 화면 로드가 끝난 후에 이미지 보여주기(로드 전 이미지 보이는걸 방지)
        this.isLoaded = true;
      },
      more() { 
        (async () => {
          const result = await this.$axios.get(`
                  ${ this.url }/products/categories/${ this.$route.params.parent_id }/${ this.$route.params.child_id }
                  ?offSet=${ this.offSet }`
          );
          const { code, message } = result.data;
          const { rows, count } = result.data.products;

          if(code === 200) {

            if (rows.length > 0) {
              this.count = count;
              rows.forEach(product => {
                this.products.push(product)
              });
              this.offSet++;
            } else {
              alert('마지막 페이지입니다.');
              return false;
            }
          } else {
            alert(message);
          }
        })();
      }
    },
    computed: {
      ...mapState(['url']),
      ...mapGetters({ productPath: 'productImagePath' })
    },
    created() {
      this.more();
    },
  }
</script>
<style>
  .custom-img {
    padding: 20%;
  }

  /* 상품 리스트 이미지 조절 */
  .wine_v_1 img {
    width: auto;
    height: 400px;
  }
</style>