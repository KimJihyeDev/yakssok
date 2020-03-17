<template>
  <!-- 제품 리뷰 시작 -->
  <div class="mt-5 border col-md-12">
    <div class="mt-3 ml-3">
      <h4 class="text-black font-weight-bold">제품 리뷰</h4>
    </div>
    <hr>
    
    <!-- 로그인 한 상태에서 보여질 리뷰 입력폼 -->
    <div class="form-group border" v-if="getloginState">
      <div class="text-center">
        <span>제품 평가를 남겨주세요(최대 300자까지 가능합니다). </span>
        <div class="text-center">
          <span class="col-lg-2 font-weight-bold">리뷰제목</span><input type="text" v-model="review.title"
            class="form-control col-lg-12" maxlength="100" ref="reviewTitle">
        </div>
        <label for="comment"><span class="font-weight-bold">리뷰</span>(글자수 <span
            class="ml-1">{{ review.contents.length }}/300)</span></label>
      </div>
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
          <label class="text-danger font-weight-bold display-5 text-nowrap">회원만 제품 리뷰를 작성하실 수 있습니다.</label>
        </div>
        <textarea class="form-control" rows="5" id="review" v-model="review.contents" maxlength="300"
          placeholder="로그인 해주세요." ref="reviewContents"></textarea>
      </router-link>
    </div>


    <!-- review list start -->
    <div class="form-group">
      <h2 class="text-center count-zero" :class="{ 'count-check': reviewCount < 1 }">리뷰가 없습니다.</h2>

      <!-- 리뷰는 최신순으로 정렬 -->
      <div class="card reviewList" v-for="(review, idx) in reviewList" :key="review.id" ref="review">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <label class="h3">{{ review.id }}</label>
              <label class="text-secondary text-center pull-right"><span>작성자:</span>{{ review.user.user_id }}</label>
              <p>
                <h3 class="text-dark font-weight-bold">{{ review.title }}</h3>
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
          <div class="card form-group " v-show="review.isShow">

            <!-- 로그인 한 상태에서 보여질 댓글 입력폼. -->
            <div class="form-group border" v-if="getloginState">
              <div class="text-center">
                <span>댓글 작성(최대 300자까지 작성하실 수 있습니다). </span>
              </div>
              <textarea class="form-control" rows="5" maxlength="300" placeholder="최대 300자까지 작성하실 수 있습니다." ref="comment"
                v-model="commentArr[idx]"></textarea>
              <div style="higth:200px;" class="text-right">
                <button type="button" class="btn btn-secondary btn-xl" @click="reply(review.id, idx)">댓글등록</button>
              </div>
            </div>

            <!-- 로그인 하지 않은 상태에서 보여질 댓글 입력폼 -->
            <div class="form-group border" v-else>
              <router-link :to="{ name: 'login' }">
                <div class="text-center">
                  <label class="text-danger font-weight-bold display-5 text-nowrap">회원만 댓글을 작성하실 수 있습니다.</label>
                  <textarea class="form-control" rows="5" maxlength="300" placeholder="로그인해주세요" ref="comment"
                    v-model="commentArr[idx]"></textarea>
                </div>
              </router-link>
            </div>

            <!-- 댓글 보기 시작 -->
            <h4 class="text-center font-bolder text-body count-zero" :class="{ 'count-check': commentCount[idx] < 1 }">
              댓글이 없습니다.
            </h4>

            <div class="card-body border" v-for="one in review.comments" :key="one.id">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    <span>{{ one.createdAt }}</span>
                    <button type="button" class="btn btn-outline-info btn-sm pull-right" disabled
                      v-if="review.userId === one.userId">작성자댓글</button>
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
        reviewCount: 0,
        commentCount: [],
      }
    },
    methods: {
      isVisible(idx, id) {
        // 댓글보기 활성화/비활성화 여부(id는 리뷰의id)

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
               
              const { code, message, result } = response.data;
              if (code === 200) {
                const { count, rows } = result;
                this.reviewList[idx].comments = rows;
                this.commentCount[idx] = count;

                this.$forceUpdate();
                
              } else {
                alert(message);
              }
            } catch (err) {
              console.log(err);
            }
          })();
        }
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
            this.review.userId = this.id;

            const response = 
              await this.$axios.post(`${ this.url }/reviews/`, this.review);

            const { code, message, result } = response.data;
            if (code === 200) {
              const { count, rows } = result;
              this.reviewList = rows;
              this.reviewCount = count;
              // 댓글 배열 초기화
              // this.commentArr = [];

              // 댓글 더보기에 사용할 요소 추가
              this.reviewList.forEach(list => {
                list.isShow = false
              });
              this.$emit('review-event');
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

              const { code, message, result } = response.data;

              if(code === 200) {
                const { count, rows } = result;
                this.reviewCount = count;
                this.reviewLis = rows;
                this.$emit('review-event');
              } else {
                alert(message);
              }
              
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      reply(reviewId, idx) {
        // v-for요소에 index에 접근할 경우의 문제점
        // 새로운 요소가 추가되어 index가 변경되어도 감지하지X
        // 강제렌더링으로 화면은 변경되었지만 ref와 index를 이용하면 
        // 변경되기 전의 리스트를 감지한다.
        // 또한 ref가 DOM요소가 아닌 데이터 구조를 가져오는 문제도 발생(렌덤발생)

        // 아래 코드에서도 에러 발생. ref로 idx에 접근할 때 data를 가져오는 문제가 발생
        // DOM과 data를 번갈아 가면서 가져온다.
        // console.log('클릭된 대상을 DOM에서 확인', this.$refs.review[idx]);
        // ref 대신 className으로 접근할 경우에는 문제없이 새로운 리스트를 인식한다.

        if (!this.commentArr[idx]) {
          alert('댓글을 입력해주세요');
          this.$refs.comment[idx].focus();
          return false;
        }

        (async () => {
          try {
            const auth = await this.auth();
            if(!auth) {
              this.commentArr[idx] = '';

              // 현재 컴포넌트만 강제로 재렌더링
              this.$emit('review-event');
              return false;
            }

            this.comment.reviewId = reviewId;
            this.comment.userId = this.id;
            this.comment.contents = this.commentArr[idx];

            const response = 
              await this.$axios.post(`${ this.url }/reviews/comments`, this.comment);

            const { code, message, result } = response.data;

            if (code === 200) {
              const { count, rows } = result;
              this.commentCount[idx] = count;
              this.reviewList[idx].comments = rows;
              this.commentArr[idx] = '';

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
        if (!isDelete) {
          this.$forceUpdate();
          return false;
        }

        (async () => {
          try {
            const auth = await this.auth();
            if(!auth) return false;

            const response =
              await this.$axios.delete(`${ this.url }/reviews/deleteComment/${ reviewId }/${ commentId }`);

            // 삭제했으면 새로 댓글 리스트를 받아온다.
            const { code, message, result } = response.data;

            if(code === 200) {
              const{ count, rows } = result;
              this.reviewList[reviewIdx].comments = rows;
              this.commentCount[reviewIdx] = count;
              this.$forceUpdate();
            } else {
              alert(message);
            }
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
          
          const { code, message, result } = response.data;
          if (code === 200) {
            const { count, rows } = result;
              this.reviewList = rows;
              this.reviewCount = count;

            // 댓글 더보기에 사용할 요소 추가
            this.reviewList.forEach(list => {
              list.isShow = false
            });
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
/* 리뷰, 댓글이 없는 경우 */
.count-zero {
  display: none;
}
/* 리뷰, 댓글이 있는 경우 */
.count-check {
  display: block;
}
</style>