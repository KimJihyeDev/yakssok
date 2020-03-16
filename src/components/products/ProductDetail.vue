<template>
  <div class="site-section">
    <div class="ml-5">
      <p class="col-md-6" v-if="isLoaded"> 카테고리 >
        {{ product.parent_category | parent_category }}
        <span v-if="child_category"> > </span> {{ child_category }}
      </p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="owl-style text-center">
            <img :src="`${ productPath }`" @load="loaded" v-show="isLoaded" alt="Image" class="img-fluid"
              style="width:60%;height:60%;">
          </div>
        </div>
        <div class="col-lg-5 ml-auto">
          <h3 class="text-primary">{{ product.product_name }}</h3>
          <h3>제조사: Now Foods</h3>
        </div>
      </div>

      <div class="container border col-12 mt-5 justify-content-center">
        <div class="row">

          <!-- 왼쪽 정렬 시작 -->
          <div class="col-md-12">
            <h2 class="h3 mb-3 text-black font-heading-serif mt-4">제품상세</h2>
            <hr>
          </div>
          <div class="col-md-6 mb-5 mb-md-0">

            <div>
              <div class="col-lg-12 mt-2">
                <strong class="h5 font-weight-bold headings">제품설명</strong>
                <p>{{ product.product_desc }}</p>
              </div>

              <div class="col-lg-12">
                <div class="mt-2">
                  <strong class="h5 font-weight-bold headings ">복용법</strong>
                  <p> {{ product.suggested_use }} </p>
                </div>
                <div class="mt-2">
                  <strong class="h5 font-weight-bold headings">기타 성분</strong>
                  <p> {{ product.other_ingredients }} </p>
                </div>
                <div class="mt-2">
                  <strong class="h5 font-weight-bold headings">주의 사항</strong>
                  <p> {{ product.warnings }} </p>
                </div>

                <!-- Pictogram  -->
                <div>
                  <img :src="`${ pictogramPath }/${ item.image_path }`" v-for="item in product.pictograms"
                    :key="item.id" style="width:80px;">
                </div>
              </div>

            </div>
          </div>
          <!-- 왼쪽 정렬 끝 -->

          <!-- 오른쪽 정렬 시작 -->
          <div class="col-md-6">
            <div class="row mb-5">
              <div class="col-md-12">
                <table class="table con-log-5">
                  <tr class="teble-color">
                    <th class="in-table" colspan="2"><strong>영양성분표</strong></th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                  </tr>
                  <tr>
                    <th class="in-table" colspan="2">1회분량</th>
                    <th>&nbsp;</th>
                    <th class="in-table" colspan="2">전체분량</th>
                  </tr>
                  <tr>
                    <td colspan="2"> {{ product.servings }} </td>
                    <td>&nbsp;</td>
                    <td colspan="2"> {{ product.total_servings }}회</td>
                  </tr>
                  <tr class="teble-color">
                    <th class="in-table" colspan="2">성분명</th>
                    <th class="in-table">함유량</th>
                    <th class="in-table" colspan="2">%영양소기준치</th>
                  </tr>
                  <tr v-for="ingredient in product.ingredients" :key="ingredient.id">
                    <td colspan="2">{{ ingredient.ingredient}}</td>
                    <td>{{ ingredient.per_serving }}</td>
                    <td colspan="2">{{ ingredient.daily_value }}<span v-if="ingredient.daily_value">%</span></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- 오른쪽 정렬 끝 -->

          <!-- 리뷰 컴포넌트 -->
          <reviewList :key="componentKey" @review-event="forceRerender" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapState, mapGetters } from 'vuex'
  import ReviewList from './ReviewList.vue'
  export default {
    name: 'ProductDetail',
    data() {
      return {
        componentKey: 0,
        product: {},  // 상품, 성분 정보
        isLoaded: false, // 화면 로드 완료 확인용
        rate: '', // 제품 평점
      }
    },
    methods: {
      loaded() {
        this.isLoaded = true;
      },
      forceRerender() {
        // 리뷰 컴포넌트 재 랜더링 처리
        this.componentKey += 1
      },
    },
    components: {
      reviewList: ReviewList,
    },
    created() {
      (async () => {
        try {
          const result
            = await this.$axios.get(`${ this.url }/products/${ this.$route.params.id }`)
          console.log('단일 제품 결과', result);
          const { code, message, product } = result.data;

          if (code === 200) {
            this.product = product;
          } else {
            alert(message);
          }
        } catch (err) {
          console.log(err);
        }
      }
      )();
    },
    beforeRouteEnter(to, from, next) {
      // 로그인된 상태에서 자기가 쓴 글인지 확인하려면 id값을 알아야 한다.
      store.dispatch('auth')
        .then(next());
    },
    filters: {
      parent_category(val) {
        if (val === 1) {
          return '영양제';
        } else {
          return '동물영양제';
        }
      },
    },
    computed: {
      ...mapState(['isLogin', 'id', 'userId', 'url']),
      ...mapGetters(['productImagePath', 'pictogramPath']),
      child_category() {
        // filter의 this는 undefined
        if (this.product.parent_category == 1) {
          if (this.product.child_category == 1) {
            return '비타민'
          } else {
            return '프로바이오틱스';
          }
        } else {
          return null;
        }
      },
      productPath() {
        // created가 실행되기 전에 먼제 이미지 경로를 읽어들인다(콘솔 확인결과)
        // imagepath가 undefined로 나오지만 출력에는 이상 없음.
        const path = `${ this.productImagePath }/${ this.product.product_image }`;
        return path;
      },
    }
  }
</script>

<style>
  .table td {
    padding: 0.2rem;
  }

  /* 폰트 스타일 */
  .headings {
    color: #3d3935;
  }

  /* 테이블 폰트 */
  .in-table {
    color: #3d3935;
    font-weight: 400;
  }

  /*테이블 컬러 */
  .teble-color {
    background-color: #f3f3f3;
  }

  /* 테이블셀 텍스트 정렬 */
  th,
  td {
    text-align: center;
  }

  /* 평가 리스트 */
  .card-inner {
    margin-left: 4rem;
  }

</style>