<template>
  <!-- 제품 리뷰 시작 -->
  <div class="mt-5 border col-md-12">
    <div class="mt-3 ml-3">
      <h4 class="text-black font-weight-bold">제품 리뷰</h4>
    </div>
    <hr>
    <!-- 로그인 한 상태에서 보여질 리뷰 입력폼 -->
    <div class="form-group border" v-if="getloginState">
      <!-- rating start -->
      <div class="text-center">
        <span>제품 평가를 남겨주세요(최대 300자까지 가능합니다). </span>
        <div class="text-center">
          <span class="col-lg-2 font-weight-bold">리뷰제목</span><input type="text" v-model="review.title"
            class="form-control col-lg-12" maxlength="100" ref="reviewTitle">
        </div>
        <label for="comment"><span class="font-weight-bold">리뷰</span>(글자수 <span
            class="ml-1">{{ review.contents.length }}/300)</span></label>
      </div>
      <!-- <div class="container">
                <div class="starrating risingstar d-flex justify-content-center flex-row-reverse" v-on:click="rating">
                  <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
                  <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
                  <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
                  <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
                  <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
                </div>
              </div> -->
      <!-- rating end -->
      <textarea class="form-control" rows="5" id="review" v-model="review.contents" maxlength="300"
        placeholder="최대 300자까지 작성하실 수 있습니다." ref="reviewContents"></textarea>
      <div style="higth:200px;" class="text-right">
        <button type="button" class="btn btn-info btn-xl" @click="write">등록</button>
      </div>
    </div>

    <!-- 로그인 하지 않은 상태에서 보여질 리뷰 입력폼 -->
    <div class="form-group border" v-else>
      <router-link :to="{ name: 'login' }">
        <div class="text-center">
          <label class="text-danger font-weight-bold h5">회원만 제품 리뷰를 작성하실 수 있습니다.</label>
        </div>
        <textarea class="form-control" rows="5" id="review" v-model="review.contents" maxlength="300"
          placeholder="로그인 해주세요." ref="reviewContents"></textarea>
      </router-link>
    </div>


    <!-- review list start -->
    <div class="container">
      <h2 class="text-center"> {{ reviewLength }} </h2>

      <!-- 리뷰는 최신순으로 정렬 -->
      <div class="card reviewList" v-for="(review, idx) in reviewList" :key="review.id" ref="review">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <label class="h3">{{ review.id }}</label>
              <label class="text-secondary text-center pull-right"><span>작성자:</span>{{ review.user.user_id }}</label>
              <p>
                <h3 class="text-dark font-weight-bold">{{ review.title }}</h3>
                <!-- <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span> -->

                <!-- </p> -->
                <span>{{ review.createdAt }}</span>
                <div class="clearfix"></div>
                <p class="text-dark font-weight-bolder">{{ review.contents }}</p>
                <p>
                  <button class="float-right btn btn-outline-primary ml-2" @click="isVisible(idx, review.id)"><i
                      class="fa fa-reply"></i> 댓글
                  </button>
                  <button class="float-right btn btn-outline-danger ml-2" @click="deleteReview(review.id)"
                    v-if="review.userId === id && getloginState"><i class="fa fa-trash-alt"></i> 삭제
                  </button>
                </p>
            </div>
          </div>

          <!-- 댓글 시작 -->
          <div class="card" v-show="review.isShow">
            <!-- 로그인 한 상태에서 보여질 댓글 입력폼. -->
            <div class="form-group border" v-if="getloginState">
              <div class="text-center">
                <span>댓글 작성(최대 300자까지 작성하실 수 있습니다). </span>
                <!-- 이 코드에서 에러 발생. -->
                <!-- <span v-if="commentArr.length > 0">글자수 {{ commentArr[idx].length }}/300 </span> -->
              </div>
              <textarea class="form-control" rows="5" maxlength="300" placeholder="최대 300자까지 작성하실 수 있습니다." ref="comment"
                v-model="commentArr[idx]"></textarea>
              <div style="higth:200px;" class="text-right">
                <!-- 리뷰의 id를 전달해 줘야 함 -->
                <button type="button" class="btn btn-secondary btn-xl" @click="reply(review.id, idx)">댓글등록</button>
              </div>
            </div>
            <!-- 로그인 하지 않은 상태에서 보여질 댓글 입력폼 -->
            <div class="form-group border" v-else>
              <router-link :to="{ name: 'login' }">
                <div class="text-center">
                  <label class="text-danger font-weight-bold h6">회원만 댓글을 작성하실 수 있습니다.</label>
                  <textarea class="form-control" rows="5" maxlength="300" placeholder="로그인해주세요" ref="comment"
                    v-model="commentArr[idx]"></textarea>
                </div>
              </router-link>
            </div>

            <!-- 댓글 보기 시작 -->
            <h4 class="text-center font-bolder text-body">{{ review.commentLength }}</h4>

            <!-- 새로 작성한 글은 코멘트 배열이 없으므로 여기서 에러 발생. 코멘트 배열 추가 -->
            <div class="card-body border" v-for="one in review.comments" :key="one.id">
              <div class="row">
                <div class="col-md-12">
                  <!-- <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span> -->
                  <p>
                    <span>{{ one.createdAt }}</span>
                    <button type="button" class="btn btn-outline-info btn-sm pull-right" disabled
                      v-if="review.userId === one.userId">작성자댓글</button>
                    <!-- 이 코드에서 계속 에러 발생 -->
                    <label class="pull-right mr-2">회원: {{ one.user.user_id }} </label>
                  </p>

                  <div class="clearfix"></div>
                  <p class="text-dark font-weight-bolder">{{ one.contents }}</p>
                  <p>
                    <!-- 자기가 쓴 댓글일 경우 삭제가 보이게 한다 -->
                    <button class="float-right btn btn-outline-danger ml-2" v-if="id === one.userId && getloginState"
                      @click="deleteComment(one.id, idx, review.id)"><i class="fas fa-trash-alt"></i> 삭제
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 댓글 끝 -->
        </div>
      </div>
    </div>
    <!-- review list end -->
  </div>
  <!-- 제품 리뷰 끝 -->
</template>

<script>
  /* eslint-disable no-undef */
  import store from '@/store'
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'reviewList',
    data() {
      return {
        reviewLength: '', // 리뷰가 없을시에 노출될 메시지
        reviewList: [], // 리뷰 리스트
        review: {
          title: '', // 리뷰 제목
          contents: '', // 상품 리뷰 내용
          userId: '', // this.id 전송 전에 대입
          productId: this.$route.params
        },
        comment: {
          contents: '',
          userId: '', // this.id. 전송 전에 대입.
          reviewId: ''
        },
        commentArr: [], // 서버에 보낼 코맨드(v-model로 연결)
      }
    },
    methods: {
      isVisible(idx, id) {
        // 댓글보기 활성화/비활성화 여부(id는 리뷰의id)
        // 그리고 댓글 불러오기
        console.log('review의 id', id);
        console.log('v-if의 인덱스 확인. class의 인덱스와 일치하는지 확인', idx);

        if (this.reviewList[idx].isShow) {
          this.reviewList[idx].isShow = false;
          this.$forceUpdate();
          return false;
        }
        if (!this.reviewList[idx].isShow) {
          this.reviewList[idx].isShow = true;
          this.$forceUpdate();
          (async () => {
            try {
              const response =
                await this.$axios.get(`${ this.url }/reviews/comments?review_id=${ id }`);
              console.log('가져온 댓글', response.data);
               
              const { code, message } = response.data;
              if (code === 200) {
                 this.reviewList[idx].comments = response.data.result;

                 this.reviewList[idx].comments.length > 0
                  ? this.reviewList[idx].commentLength = ''
                  : this.reviewList[idx].commentLength = '댓글이 없습니다.'
                  this.$forceUpdate();
              } else {
                alert(message);
              }
            } catch (err) {
              console.log(err);
            }
          })();
        }
        // if (this.reviewList[idx].isShow) {
        //   this.$forceUpdate();
        //   return this.reviewList[idx].isShow = false;

        // } else {
        //   this.reviewList[idx].isShow = true;
        //   (async () => {
        //     try {
        //       const response =
        //         await this.$axios.get(`${ this.url }/reviews/comments?review_id=${ id }`);
        //       console.log('가져온 댓글', response.data);

        //       this.reviewList[idx].comments = response.data.result;
        //       console.log('흠??', this.reviewList[idx].comments);
        //       response.data.comments.length > 0
        //         ? this.reviewList[idx].commentLength = ''
        //         : this.reviewList[idx].commentLength = '댓글이 없습니다.'
        //       this.$forceUpdate();

        //     } catch (err) {
        //       console.log(err);
        //     }
        //   })();
        // }
      },
      checkReview() {
        // 널값체크
        if (!this.review.title) {
          alert('리뷰 제목을 입력해 주세요.');
          this.$refs.reviewTitle.focus();
          return false;
        } else if (!this.review.contents) {
          alert('리뷰 내용을 입력해 주세요.');
          this.$refs.reviewContents.focus();
          return false;
        }
        return true;
      },
      resetReview() {
        this.review.title = '';
        this.review.contents = '';
      },
      auth() {
        // 내부에 비동기 코드가 들어가 있는 코드가
        // 다른 코드에 호출 될 경우에는
        // 반드시 다음 2가지 형태 중 하나를 취한다.
        // 1. 아래처럼 return(비동기 코드 전체. 
        //  내부에 async나 then 사용. 콜백도 당연히 가능하겠지?)
        // 2. 콜백(비동기 코드 전체. 내부는 위와 같음)
        // ** 아래 코드에서 return 가 삭제되면 동기화 실패하므로 주의 **
        // return 작성 안 한 것 때문에 동기화 실패했었음
        return (async () => {
          await store.dispatch('auth');

          if(!store.getters.auth) {
            alert('로그인 되어있지 않습니다. 다시 로그인 해주세요.');
            this.resetReview();
            return false;
          } else {
            return true;
          }
        })();
      },
      write() { 
        const check = this.checkReview();
        if(!check) return false;
        
        (async () => {
          const auth = await this.auth();
          if(!auth) return false;

          // 토큰이 만료되었다면 로그아웃처리가 된다
            console.log('reviw:글 작성시 id확인', this.id);
            this.review.userId = this.id;

            // post방식일 때, token은 전송할 데이터 다음에 작성
            const response = 
              await this.$axios.post(`${ this.url }/reviews/`, this.review);

            console.log('review:리뷰 작성 응답', response);
            const { code, message } = response.data;
            if (code === 201) {
              this.reviewList = response.data.result;
              console.log('review:바뀐 리스트 확인', this.reviewList);
              // 댓글 배열 초기화
              // this.commentArr = [];

              // 댓글 더보기에 사용할 요소 추가
              this.reviewList.forEach(list => {
                list.isShow = false
                list.commentLength = ''; // 댓글이 없습니다에 사용될 변수
              });

              this.resetReview();
              this.$forceUpdate();
            } else {
              alert(message);
            }
        })();
      },
      deleteReview(reviewId) {
        const isDelete = confirm('삭제하시겠습니까?');
        if (!isDelete) return false;

        (async () => {
          try {
            const auth = await this.auth();
            if(!auth) return false;

            if (auth) {
              const response =
                await this.$axios.delete(`${this.url}/reviews/delete/${this.$route.params.id}/${reviewId}`);

              const { code, message } = response.data;
              console.log('삭제후', response);
              code === 200
                ? this.reviewList = response.data.result
                : alert(message);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      reply(reviewId, idx) {
        // ref에 중대한 문제점 발견
        // 새로운 요소가 추가되어 index가 변경되어도 감지하지X
        // 강제렌더링으로 화면은 변경되었지만 ref와 index를 이용하면 
        // 변경되기 전의 리스트를 감지한다.
        // 또한 ref가 DOM요소가 아닌 데이터를 가져오기도 하는 문제도 발생

        // 아래 코드에서도 에러 발생. ref로 접근할 때 data를 가져오는 문제가 발생
        // DOM과 data를 번갈아 가면서 가져온다.
        // console.log('클릭된 대상을 DOM에서 확인', this.$refs.review[idx]);
        // ref 대신 className으로 접근

        // v-if가 아닌 v-show를 써야 했다
        // v-if를 쓰니까 textarear가 존재하질 않는다. 

        if (!this.commentArr[idx]) {
          alert('댓글을 입력해주세요');
          this.$refs.comment[idx].focus();
          return false;
        }

        (async () => {
          try {
            const auth = await this.auth();
            if(!auth) {
              console.log('댓글달려했는데 로그인x', this.commentArr[idx]);
              this.commentArr[idx] = '';
              this.$forceUpdate();
              return false;
            }

            this.comment.reviewId = reviewId;
            this.comment.userId = this.id;
            this.comment.contents = this.commentArr[idx];

            const response = 
              await this.$axios.post(`${ this.url }/reviews/comments`, this.comment);

            const { code, message, result } = response.data;
            if (code === 201) {
              this.reviewList[idx].comments = result;
              this.commentArr[idx] = '';

             // 댓글이 없습니다 안 보이게 처리
              this.reviewList[idx].commentLength = '';
              this.$forceUpdate();
            } else {
              alert(message);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      deleteComment(commentId, reviewIdx, reviewId) {
        const isDelete = confirm('삭제하시겠습니까?');
        if (!isDelete) return false;

        (async () => {
          try {
            const auth = await this.auth();
            if(!auth) return false;

            const response =
              await this.$axios.delete(`${this.url}/reviews/deleteComment/${reviewId}/${commentId}`);
            console.log(response);
            // 삭제했으면 새로 댓글 리스트를 받아온다.
            const { code, message } = response.data;
            code === 200
              ? this.reviewList[reviewIdx].comments = response.data.result
              : alert(message);
            this.$forceUpdate();
          } catch (err) {
            console.log(err);
          }
        })();
      }
    },
    computed: {
      ...mapState(['id', 'userId', 'url']),
      ...mapGetters(['getloginState'])
    },
    created() {
      (async () => {
        try {
          const response =
            await this.$axios.get(`${this.url}/reviews?productId=${this.$route.params.id}`)
          console.log('리뷰리스트', response.data);

          const { code, message } = response.data;
          if (code === 200) {
            this.reviewList = response.data.result;

            this.reviewList.length < 1
              ? this.reviewLength = '리뷰가 없습니다.'
              : this.reviewLength = '';

            // 댓글 더보기에 사용할 요소 추가
            this.reviewList.forEach(list => {
              list.isShow = false
              list.commentLength = ''; // 댓글이 없습니다에 사용될 변수
            });


          } else {
            alert(message);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }
</script>