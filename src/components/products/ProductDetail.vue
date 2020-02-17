<template>
  <div>
    <div style="margin:80px 70px 0px 70px;">
      <p style="top:0px;margin:0px;padding:0;" class="col-md-6"> 카테고리 > {{ product.parent_category | parent_category }}
        <span v-if="!(child_category=== null)"> > </span> {{ child_category }} </p>
    </div>
    <div class="site-section mt-5 product">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="owl-style" style="text-align:center">
              <img :src="`${ productPath }`" v-on:load="loaded" v-show="isLoaded" alt="Image" class="img-fluid"
                style="width:60%;height:60%;">
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
                  <th class="in-table">1회 분량당</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th class="in-table">함량</th>
                  <th class="in-table">%영양소기준치</th>
                </tr>
                <tr v-for="(item,idx) in product.ingredients" :key="idx">
                  <td>{{ item.ingredient}}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>{{ item.per_serving }}</td>
                  <td>{{ item.daily_value }}</td>
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
                <img :src="`${ pictogramPath }/${ item.image_path }`" v-for="(item,idx) in product.pictograms"
                  :key="idx" style="width:80px;">
              </div>
              <!-- Pictogram End -->
            </div>
            <!-- 왼쪽 정렬 끝 -->
          </div>
        </div>
        <!-- 제품 정보 끝 -->

        <!-- 제품 리뷰 시작 -->
        <div class="border" style="margin-top:20px;">
          <div style="margin-left:1em; margin-top:1em;">
            <h4 style="font-weight:900;color:#3d3935;">제품 리뷰</h4>
          </div>
          <hr>
          <!-- 로그인 되어 있는 경우(300자 까지 허용, 0/300으로 글자 수 카운트하기) -->
          <div class="form-group" style="border:1px solid lightgray">
            <label for="comment">Comment <span style="margin-left:0.3rem">{{ comment.length }}/300</span></label>
            <textarea class="form-control" rows="5" id="comment" v-model="comment" maxlength="300"
              placeholder="최대 300까지 작성하실 수 있습니다."></textarea>
            <!-- 버튼은 오른쪽으로 배치(text-right) -->
            <div style="higth:200px;" class="text-right">
              <button type="button" class="btn btn-primary btn-xl">등록</button>
            </div>
          </div>
          <!-- 로그인 되어 있지 않은 경우 -->
          <div class="text-center col-lg-12">
            <router-link :to="{ name: 'login' }" class="text-danger font-weight-bold font" style="font-size:1rem;">로그인
              해야만 제품 리뷰를 작성하실 수 있습니다.
            </router-link>
          </div>
          <!-- review list start -->
          <!-- 별점 코드 :class rate적용하기(class가 2개인게 정상 맞다)  -->
          <div class="container">
            <h2 class="text-center">Bootstrap 4 User Rating Form / Comment Form</h2>

            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-2">
                    <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                    <p class="text-secondary text-center">15 Minutes Ago</p>
                  </div>
                  <div class="col-md-10">
                    <p>
                      <a class="float-left"
                        href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman
                          Akash</strong></a>
                      <span class="float-right"><i class="fa fa-star star"></i></span>
                      <span class="float-right"><i class="fa fa-star star rate"></i></span>
                      <span class="float-right"><i class="fa fa-star star rate"></i></span>
                      <span class="float-right"><i class="fa fa-star star rate"></i></span>
                      <span class="float-right"><i class="fa fa-star star rate"></i></span>

                    </p>
                    <div class="clearfix"></div>
                    <p>Lorem Ipsum is simply dummy text of the pr make but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                      Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>
                      <a class="float-right btn btn-outline-primary ml-2"> <i class="fa fa-reply"></i> Reply</a>
                      <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                    </p>
                  </div>
                </div>
                <div class="card card-inner">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-2">
                        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                        <p class="text-secondary text-center">15 Minutes Ago</p>
                      </div>
                      <div class="col-md-10">
                        <p><a href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman
                              Akash</strong></a></p>
                        <p>Lorem Ipsum is simply dummy text of the pr make but also the leap into electronic
                          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>
                          <a class="float-right btn btn-outline-primary ml-2"> <i class="fa fa-reply"></i> Reply</a>
                          <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- review list end -->
          <!-- rating start -->

          <h1 class="text-center" alt="Simple">Simple Pure CSS Star Rating Widget Bootstrap 4</h1>

          <div class="container">
            <div class="starrating risingstar d-flex justify-content-center flex-row-reverse" v-on:click="rating">
              <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
              <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
              <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
              <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
              <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
            </div>
          </div>

          <h2 class="text-center" alt="Simple"><a href="http://themastercut.co">Check also WordPress Plugins on
              TheMasterCut.co</a></h2>
          <!-- rating end -->
        </div>
        <!-- 제품 리뷰 끝 -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: {},  // 상품, 성분 정보
        comment: '', // 상품 리뷰
        isLoaded: false, // 화면 로드 완료 확인용
        rate: '',
      }
    },
    methods: {
      loaded() {
        // 화면 로드가 끝난 후에 이미지 보여주기(로드 전 이미지 보이는걸 방지)
        this.isLoaded = true;
      },
      rating(event) {
        // event는 이벤트를 가져온다(현재는 클릭이벤트)   
        console.log(event);
        // var ele = event.currentTarget; 
        // currentTarget = 이벤트를 걸어놓은 div
        // target = div의 자식 중 클릭된 input 태그
        var ele = event.target.value;
        console.log(ele);
      }
    },
    created() {
      // 경로를 직접 입력하여 들어간 경우 생명주기가 작동하지 않는걸로 보인다.
      // 동일한 컴포넌트 인스턴스가 재사용 되기 때문으로 보임.
      (async () => {
        try {
          const result = await this.$axios.get(`${this.$store.state.url}/products/${this.$route.params.id}`)
          console.log(result);
          this.product = result.data[0];
          console.log(this.product)
        } catch (err) {
          console.log(err);
        }
      }
      )();
    },
    mounted() {
      // getElementsByClassName은
      // 해당 클레스에 속하는 요소들을 HTMLCollection으로 반환
      // HTMLCollection은 배열이 아니다.
      // classList는 해당 요소가 가지고 있는 클래스들의 domtokenlist
      // 이것도 배열과 비슷하지만 배열은 아니다. 
      const star = document.getElementsByClassName('rate')
      console.log(star)
      // num 을 db에서 받은 rating으로 변경하기
      const num = 2;
      for (var i = 1; i <= num; i++) {
        star[star.length - i].classList.add('text-warning')
      }
    },
    beforeRouteUpdate(to, from, next) {
      // react to route changes...
      // don't forget to call next()
      // go()는 브라우저 차원의 이동(화면 리로드)
      // 찾고자 하는 페이지가 없을 경우의 처리도 필요
      //  next(this.$router.go(to.path));
      next();
      this.$router.go(to.path)

    },
    beforeRouteEnter(to, from, next) {
      next()
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
      ...mapGetters(['productImagePath', 'pictogramImagePath']),
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
        const path = `${this.productImagePath}/${this.product.product_image}`;
        return path;
      },
      pictogramPath() {
        let path = `${this.pictogramImagePath}`;
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