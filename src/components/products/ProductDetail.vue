<template>
  <div>
    <div style="margin:90px 70px 0px 70px;">
      <p style="top:0px;margin:0px;padding:0;" class="col-md-6" v-if="isLoaded" @load="loaded"> 카테고리 > {{ product.parent_category | parent_category }}
        <span v-if="child_category"> > </span> {{ child_category }} </p>
    </div>
    <div class="site-section mt-5 product">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="owl-style" style="text-align:center">
              <img :src="`${ productPath }`" @load="loaded" v-show="isLoaded" alt="Image" class="img-fluid"
                style="width:60%;height:60%;">
            </div>
          </div>
          <div class="col-lg-5 ml-auto">
            <h3 class="text-primary">{{ product.product_name }}</h3>
            <h3>제조사: Now Foods</h3>
            <!-- <h6>좋아요 위치</h6>
            <h2><a href="#" onclick="return false;"><i class="fa fa-thumbs-up" aria-hidden="true"
                  style="color:lightgray"></i></a>
              <span class="price" style="margin-left:0.3rem">0</span>
              <a href="#" onclick="return false;" style="margin-left:1rem"><i class="fa fa-thumbs-down"
                  aria-hidden="true" style="color:lightgray"></i></a>
              <span class="price" style="margin-left:0.3rem">0</span>
            </h2> -->
            <!-- <h6>해시태그 위치</h6> -->
            <!-- <input type="button" value="#noeggs" class="btn"> -->
          </div>
        </div>
        <!-- product detail Start -->
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
              <p>{{ product.product_desc }}</p>
            </div>
            <!-- Ingredients Table Start -->
            <div class="panel panel-default col-lg-5 ml-auto" style="margin-right:1rem;">
              <div class="panel-heading">
              </div>
              <table class="table con-log-5">
                <tr class="teble-color">
                  <th class="in-table"><strong>영양성분표</strong></th>
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
                  <td> {{ product.servings }} </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td> {{ product.total_servings }}회</td>
                  <td>&nbsp;</td>
                </tr>
                <tr class="teble-color">
                  <th class="in-table">성분명</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th class="in-table">함유량</th>
                  <th class="in-table">%영양소기준치</th>
                </tr>
                <tr v-for="ingredient in product.ingredients" :key="ingredient.id">
                  <td>{{ item.ingredient}}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>{{ ingredient.per_serving }}</td>
                  <td>{{ ingredient.daily_value }}<span v-if="ingredient.daily_value">%</span></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </table>
              <!-- Ingredients Table Start -->
            </div>

            <div class="col-lg-6">
              <div style=" margin-top:1em;">
                <strong class="headings">복용법</strong>
                <p> {{ product.suggested_use }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong class="headings">기타 성분</strong>
                <p style="margin-top:0px;"> {{ product.other_ingredients }} </p>
              </div>
              <div style=" margin-top:1em; margin-botom:0px;">
                <strong class="headings">주의 사항</strong>
                <p style="margin-top:0px;"> {{ product.warnings }}</p>
              </div>
              <!-- Pictogram Start -->
              <div>
                <!-- 반복문 돌려야 하므로 경로는 더 이상 수정 어려움 -->
                <img :src="`${ pictogramPath }/${ item.image_path }`" v-for="item in product.pictograms"
                  :key="item.id" style="width:80px;">
              </div>
              <!-- Pictogram End -->
            </div>
            <!-- 왼쪽 정렬 끝 -->
          </div>
        </div>
        <!-- 제품 정보 끝 -->

        <!-- 리뷰 -->
        <reviewList :key="componentKey" />
        <!-- <button @click="forceRerender">리뷰컴포넌트 강제 렌더링</button> -->
      </div>
    </div>
  </div>
</template>

<script>
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
      forceRerender() {
        // 자식 컴포넌트 재 랜더링 처리
      this.componentKey += 1
    },
      loaded() {
        // 화면 로드가 끝난 후에 이미지 보여주기(로드 전 이미지 보이는걸 방지)
        this.isLoaded = true;
      },
      // rating(event) { // 평점(별점)
      //   // event는 이벤트를 가져온다(현재는 클릭이벤트)   
      //   console.log(event);
      //   // var ele = event.currentTarget; 
      //   // currentTarget = 이벤트를 걸어놓은 div
      //   // target = div의 자식 중 클릭된 input 태그
      //   var ele = event.target.value;
      //   console.log(ele);
      // },
    },
    components: {
      reviewList: ReviewList,
    },
    created() {
      // 경로를 직접 입력하여 들어간 경우 생명주기가 작동하지 않는걸로 보인다.
      // 동일한 컴포넌트 인스턴스가 재사용 되기 때문으로 보임.
      (async () => {
        try {
          const result 
            = await this.$axios.get(`${ this.url }/products/${ this.$route.params.id }`)
          console.log('단일 제품 결과', result);
          const { code, message, product } = result.data;

          if(code === 200) {
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
    mounted() {
      // 평점(별점 관련 코드)
      // getElementsByClassName은
      // 해당 클레스에 속하는 요소들을 HTMLCollection으로 반환
      // HTMLCollection은 배열이 아니다.
      // classList는 해당 요소가 가지고 있는 클래스들의 domisLoginlist
      // 이것도 배열과 비슷하지만 배열은 아니다. 
      // const star = document.getElementsByClassName('rate')
      // console.log(star)
      // // num 을 db에서 받은 rating으로 변경하기
      // const num = 2;
      // for (var i = 1; i <= num; i++) {
      //   star[star.length - i].classList.add('text-warning')
      // }
    },
    beforeRouteUpdate(to, from, next) {
      // go()는 브라우저 차원의 이동(화면 리로드)
      //  next(this.$router.go(to.path));
      next();
      this.$router.go(to.path)

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
        if (this.product.parent_category === 1) {
          if (this.product.child_category === 1) {
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
  .product {
    margin-top: 0px !important;
  }

  .table td {
    padding: 0.2rem;
  }

  /* 폰트 스타일 */
  .headings {
    font-weight: 600;
    color: #3d3935;
    font-size: 18px;
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

  /* star rating */

  /* @import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css); */

  h1[alt="Simple"] {
    color: white;
  }

  a[href],
  a[href]:hover {
    color: grey;
    font-size: 0.5em;
    text-decoration: none
  }

  .starrating>input {
    display: none;
  }

  /* Remove radio buttons */

  .starrating>label:before {
    content: "\f005";
    /* Star */
    margin: 2px;
    font-size: 2em;
    font-family: FontAwesome;
    display: inline-block;
  }

  .starrating>label {
    color: lightgray;
    /* Start color when not clicked */
  }

  .starrating>input:checked~label {
    color: orange;
  }

  /* Set yellow color when star checked */
  .starrating>input:hover~label {
    color: orange;
  }

</style>