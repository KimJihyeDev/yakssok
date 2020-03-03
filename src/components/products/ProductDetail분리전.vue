<template>
  <div>
    <div style="margin:90px 70px 0px 70px;">
      <p style="top:0px;margin:0px;padding:0;" class="col-md-6" v-if="isLoaded" v-on:load="loaded"> 카테고리 > {{ product.parent_category | parent_category }}
        <span v-if="child_category"> > </span> {{ child_category }} </p>
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
                  <td>{{ item.daily_value }}<span v-if="item.daily_value">%</span></td>
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
        <review/>
      
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Review from './Review.vue'
  // eslint-disable-next-line no-unused-vars
  import store from '@/store'
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: {},  // 상품, 성분 정보
        review: {
          title: '', // 리뷰 제목
          contents: '', // 상품 리뷰 내용
          userId: '', // this.$store.state.id (여기서 해줘도 적용X. 생명주기에서 대입)
          productId: this.$route.params
        },
        comment: {
          contents: '',
          userId: '', // this.id 해도 소용x. 전송시에 직접 대입해줘야 함
          reviewId: ''
        },
        isLoaded: false, // 화면 로드 완료 확인용
        rate: '', // 제품 평점
        reviewList: [],
        reviewAdd: 0, 
      }
    },
    methods: {
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
      isVisible(idx, id) {
        // 댓글보기 활성화/비활성화 여부(id는 리뷰의id)
        // 그리고 댓글 불러오기
        console.log('몇번째요소?')
        console.log(idx);
        console.log(this.$refs.list[idx]);
        // 아래 코드는 유효x
        // !(this.$refs.list[idx].style.display)
        //   ? this.$refs.list[idx].style.display = ''
        //   : this.$refs.list[idx].style.display = ''
        (async () => {
          try {
            const response = await this.$axios.get(`${ this.url }/reviews/comments?review_id=${ id }`);
            console.log('가져온 댓글', response.data);

            console.log(this.reviewList[idx])
            this.reviewList[idx].comments = response.data;
            response.data.length > 0
              ? this.reviewList[idx].commentLength = ''
              : this.reviewList[idx].commentLength = '댓글이 없습니다.'
            this.$forceUpdate();
           
          } catch(err) {
            console.log(err);
          }
        })();
        this.$forceUpdate();
        // 클릭에 의해 댓글창이 보일지 말지 결정
        this.reviewList[idx].isShow 
          ? this.reviewList[idx].isShow = false
          : this.reviewList[idx].isShow = true

      },
      write() {
        (async () => {
          // 널값체크
          if(!this.review.title){
            alert('리뷰 제목을 입력해 주세요.');
            this.$refs.reviewTitle.focus();
            return false;
          } else if(!this.review.contents) {
            alert('리뷰 내용을 입력해 주세요.');
            this.$refs.reviewContents.focus();
            return false;
          }
          
          try {
            const response = await this.$axios.post(`${ this.url }/reviews/`, this.review);
            console.log(response);
            console.log('요청보냄')
            const { code, message } = response.data;
            if(code === 201) {
              // 상품평을 뿌릴 때 코멘트 배열의 길이를 비교하는데
              // 방금 생성된 상품평에는 코멘트가 없어서 v-for로 뿌릴 때 에러 발생
              // 에러를 막기 위해 빈 코맨드 배열 추가
              response.data.result.comments = [];
              this.review.title = '';
              this.review.contents = '';
              
              // splice: 배열의 기존 요소를 삭제 또는 교체하거나
              //  새 요소를 추가하여 배열의 내용을 변경합니다.
              // array.splice(start, deleteCount, item )
              // start = 시작 인덱스, deleteCount = 삭제할 요소의 개수
              //  item은 배열에 추가할 요소
              // deleteCount를 0으로 하면 기존 요소는 삭제되지 않고 
              // 새 요소가 기존 요소의 자리를 차지하게 된다
              this.reviewList.splice(0, 0, response.data.result);

              console.log('리스트 바뀌나?')
              console.log(this.reviewList);
              // 반드시 강제로 재 렌더링을 해줘야 vue에서 제대로 인식됨
              // 안 그러면 댓글 달 때도 인식X(예전 리스트를 인식함)
              this.$forceUpdate();

            } else {
              alert(message);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      deleteReview(id, idx){
        const isDelete = confirm('삭제하시겠습니까?');
        if(isDelete) {
          (async () => {
            this.reviewList.splice(idx, 1);
            try {
              const response = this.$axios.delete(`${ this.url }/reviews/delete?review_id=${ id }`)
              console.log(response)
            } catch(err) {
              console.log(err);
            }
          })();
        } else {
          return false;
        }
      },
      // modifyReview(id, idx){
      //   (async () => {
      //       console.log(idx);
      //       try {
      //         const response = this.$axios.patch(`${ this.url }/reviews/modify?review_id=${ id }`)
      //         console.log(response)
      //       } catch(err) {
      //         console.log(err);
      //       }
      //   })();
        
      // },
      reply(reviewId, idx){
        (async () => {
         
            console.log('리뷰id확인', reviewId);
            console.log('작성자 id확인', this.comment.userId)
            console.log('인덱스확인', idx);
            console.log('댓글요소', this.$refs.comment[idx]);
            console.log('댓글내용확인', this.$refs.comment[idx].value);
            console.log('리뷰대상', this.reviewList[idx]);
            // console.log('dom에 접근한다', this.$refs.list[idx]);
            // console.log('자식에 접근한다', this.$refs.list[idx].childNodes);
            // console.log('자식에 접근한다', this.$refs.list[idx].childNodes.childNodes);
            // console.log('댓글내용확인', this.$refs.comment[idx].value);

            // v-for로 반복을 돌렸으므로 v-model로는 처리불가
            // data옵션에 정의하면 모든 v-for요소들이 상태를 공유하게 된다.
            this.comment.reviewId = reviewId;
            this.comment.userId = this.id;
            this.comment.contents = this.$refs.comment[idx].value;
           
          if(!this.comment.contents) {
             alert('댓글을 입력해주세요');
             return false;
          }
          try {
            const response = await this.$axios.post(`${ this.url }/reviews/comments`, this.comment);
            console.log(response);
            const { code, message } = response.data;

            if(code === 201) {
              // 받아온 데이터를 기존 댓글 리스트에 추가해야한다.
              // user_id가 없음. 서버에서 받아와야 함.
              console.log('새로 작성한 코멘트 받아옴', response.data.result)
              // 댓글 단 사람에 현재 user_id추가해주기
              console.log('store의serid확인', this.userId);
              response.data.result.user_id = this.userId;
              console.log('user_id추가 확인', response.data.result)
              
              this.reviewList[idx].comments.push(response.data.result);
              this.comment.contents = '';
              this.$refs.comment[idx].value = '';
              // reviewId도 지워줘야 함. 지우지 않을시 에러 발생. 왜?
              this.comment.reviewId = '';
              this.$forceUpdate();
            } else {
              alert(message);
            }
          } catch(err) {
            console.log(err);
          }
        }

        )();
      },
    },
    created() {
      // 경로를 직접 입력하여 들어간 경우 생명주기가 작동하지 않는걸로 보인다.
      // 동일한 컴포넌트 인스턴스가 재사용 되기 때문으로 보임.
      (async () => {
        // 먼저 현재 로그인 유무, 유효성을 확인한다.
        try {
          const result = await this.$axios.get(`${ this.url }/products/${ this.$route.params.id }`)
          console.log(result);
          this.product = result.data.productInfo;
          this.reviewList = result.data.reviewInfo;
          // 댓글 더보기에 사용할 요소 추가
          this.reviewList.forEach(list => {
            list.isShow = false
            list.comments = [];
            list.commentLength = ''; // 댓글이 없습니다에 사용될 변수
          })
          console.log('확인해보자!!', this.reviewList);

          this.reviewListLength =  this.reviewList.length;
          console.log('배열 길이 확인');
          console.log(this.reviewListLength)

          // 반드시 직접 대입해 줘야 인식됨. 어째서??
          this.review.userId = this.id;

          console.log(this.product)
          console.log('detail에서 usreid확인**');
          console.log(this.review.userId, 'store는', this.id);
          console.log('productDetail에서 user_id확인', this.user_id);
          console.log('product params확인')
          console.log(this.$route.params);
        } catch (err) {
          console.log(err);
        }
      }
      )();
    },
    updated(){
      console.log('업데이트')
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
      // react to route changes...
      // don't forget to call next()
      // go()는 브라우저 차원의 이동(화면 리로드)
      // 찾고자 하는 페이지가 없을 경우의 처리도 필요
      //  next(this.$router.go(to.path));
      next();
      this.$router.go(to.path)

    },
    beforeRouteEnter(to, from, next) {
      // 글 작성을 위해 로그인 여부, id를 확인한다.
      store.dispatch('getUserId');
      next()
    },
    watch: {
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
    components: {
      review: Review
    },
    computed: {
      ...mapState(['isLogin', 'id', 'userId', 'url']),
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
        const path = `${this.pictogramImagePath}`;
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