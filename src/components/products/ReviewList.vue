
<template>
  <!-- 제품 리뷰 시작 -->
  <div class="border" style="margin-top:20px;">
    <div style="margin-left:1em; margin-top:1em;">
      <h4 style="font-weight:900;color:#3d3935;">제품 리뷰</h4>
    </div>
    <hr>
    <!-- 로그인 되어 있는 경우(300자 까지 허용, 0/300으로 글자 수 카운트하기) -->
    <div class="form-group" style="border:1px solid lightgray" v-if="isLogin">
      <!-- rating start -->
      <div class="text-center">
        <span>제품 평가를 남겨주세요(최대 300자까지 가능합니다). </span>
        <div class="text-center">
          <span class="col-lg-2 font-weight-bold">리뷰제목</span><input type="text" v-model="review.title"
            class="form-control col-lg-12" ref="reviewTitle">
        </div>
        <label for="comment"><span class="font-weight-bold">글내용</span>(글자수 <span
            style="margin-left:0.5rem">{{ review.contents.length }}/300)</span></label>
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
        placeholder="최대 300까지 작성하실 수 있습니다." ref="reviewContents"></textarea>
      <!-- 버튼은 오른쪽으로 배치(text-right) -->
      <div style="higth:200px;" class="text-right">
        <button type="button" class="btn btn-info btn-xl" @click="write">등록</button>
      </div>
    </div>
    <!-- 로그인 되어 있지 않은 경우 -->
    <div class="text-center col-lg-12" v-if="!isLogin">
      <router-link :to="{ name: 'login' }" class="text-danger font-weight-bold font" style="font-size:1rem;">
        회원만 제품 리뷰를 작성하실 수 있습니다.
      </router-link>
      <hr class="divider">
    </div>
    <!-- review list start -->
    <div class="container">
      <h2 class="text-center"> {{ reviewLength }} </h2>

      <!-- 리뷰는 최신순으로 정렬 -->
      <div class="card reviewList" v-for="(review, idx) in reviewList" :key="review.id" ref="review">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <h1>{{ review.id }}</h1>
              <img src="/assets/images/profile-picture.PNG" class="img rounded-circle img-fluid" />
              <p class="text-secondary text-center"><span>회원:</span>{{ review.user_id }}</p>
            </div>
            <div class="col-md-10">
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
                  <!-- <button class="float-right btn btn-outline-warning ml-2" @click="modifyReview(review.id, idx)" ><i
                    class="fa fa-pencil-alt"></i> 수정
                 </button> -->
                  <button class="float-right btn btn-outline-danger ml-2" @click="deleteReview(review.id, idx)"
                    v-if="review.userId === id"><i class="fa fa-trash-alt"></i> 삭제
                  </button>
                </p>
            </div>
          </div>
          <!-- 댓글 시작 -->
          <div class="card" v-show="review.isShow">
            <!-- 댓글 입력폼 시작 -->
            <!-- 댓글작성도 로그인 한 사용자만 볼 수 있어야 한다. -->
            <div class="form-group" style="border:1px solid lightgray" v-show="isLogin">
              <div class="text-center">
                <span>댓글 작성(최대 300자까지 가능합니다). </span>
              </div>
              <textarea class="form-control comment" rows="5" maxlength="300"
                placeholder="최대 300까지 작성하실 수 있습니다." ref="comment"></textarea>
              <!-- 버튼은 오른쪽으로 배치(text-right) -->
              <div style="higth:200px;" class="text-right">
                <!-- 리뷰의 id를 전달해 줘야 함 -->
                <button type="button" class="btn btn-secondary btn-xl" @click="reply(review.id, idx)">댓글등록</button>
                <!-- 코멘터확인{{ review.comment}} -->
              </div>
            </div>
            <!-- 댓글 입력폼 끝 -->

            <!-- 댓글 보기 시작 -->
            <h4 class="text-center font-bolder text-body">{{ review.commentLength }}</h4>

            <!-- 새로 작성한 글은 코멘트 배열이 없으므로 여기서 에러 발생. 코멘트 배열 추가 -->
            <div class="card-body border" v-for="one in review.comments" :key="one.id">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    <!-- <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span>
              <span class="float-right"><i class="fa fa-star star rate"></i></span> -->

                    <!-- </p> -->
                    <span>{{ one.createdAt }}</span>
                    <!-- 자기가 쓴글이라서 작성자라고 출력되어야 한다. -->
                    <div class="pull-right">
                      <strong class="pull-right">
                        <label>회원:</label>{{ one.user_id }}
                        <button type="button" class="btn btn-outline-info" disabled
                          v-if="review.userId === one.userId">작성자댓글</button>
                      </strong>
                    </div>

                    <div class="clearfix"></div>
                    <!-- <strong class="text-dark font-bolder">@수신자</strong> -->
                    <p class="text-dark font-weight-bolder">{{ one.contents }}</p>
                    <p>
                      <!-- 자기가 쓴 댓글일 경우 삭제가 보이게 한다 -->
                      <button class="float-right btn btn-outline-danger ml-2" v-if="id === one.userId && isLogin"
                       @click="deleteComment(one.id, idx, review.id)"><i class="fas fa-trash-alt" ></i> 삭제
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
  // import store from '@/store'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'reviewList',
    data() {
      return {
        reviewLength: '', // 리뷰가 없을시에 노출될 메시지
        reviewList: [],
        review: {
          title: '', // 리뷰 제목000000000
          contents: '', // 상품 리뷰 내용
          userId: '', // this.$store.state.id (여기서 해줘도 적용X. 서버에 전송 전에 대입)
          productId: this.$route.params
        },
        comment: {
          contents: '',
          userId: '', // this.id 해도 소용x. 전송시에 직접 대입해줘야 함
          reviewId: ''
        },
      }
    },
    // watch: {
    //   'reviewList'(newVal, oldVal) {
    //     console.log('oldVal이 누구냐?', oldVal);
    //     console.log('newVal이 누구냐?', newVal);
    //     var oldnum = oldVal[0];
    //     var newnum = newVal[0];

    //     console.log('이전0번', oldnum);
    //     console.log('새0번', newnum);

    //     this.$nextTick(function() {
    //      this.$refs.review.splice(0, 0, newnum);
    //      console.log('0번이 아직도 그대로냐', this.$refs.review[0])

    //    })
    //     return oldVal = newVal;
    //   }, 
    //     deep: true,
    // },
    methods: {
      ...mapActions(['getUserId']),
      isVisible(idx, id) {
        // 댓글보기 활성화/비활성화 여부(id는 리뷰의id)
        // 그리고 댓글 불러오기
        console.log('review의 id', id);
        console.log('v-if의 인덱스 확인. class의 인덱스와 일치하는지 확인', idx);
        
        if(this.reviewList[idx].isShow) {
          this.$forceUpdate();
          return this.reviewList[idx].isShow = false;

        } else {
          this.reviewList[idx].isShow = true;
          (async () => {
          try {
            const response = await this.$axios.get(`${this.url}/reviews/comments?review_id=${ id }`);
            console.log('가져온 댓글', response.data);

            this.reviewList[idx].comments = response.data.result;
            response.data.length > 0
              ? this.reviewList[idx].commentLength = ''
              : this.reviewList[idx].commentLength = '댓글이 없습니다.'
            this.$forceUpdate();
            
          } catch (err) {
            console.log(err);
          }
        })();

        }
      },
      write() {
        (async () => {
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

          try {
            console.log('리뷰 보낼거 확인해봅시다', this.review);
            this.review.userId = this.id;
            // 토큰 유효성 확인
            this.getUserId();
            // 글 작성 요청
            const response = await this.$axios.post(`${ this.url }/reviews/`, this.review);
            console.log('리뷰 작성 응답', response);
            const { code, message } = response.data;
            if (code === 201) {
              this.reviewList = response.data.result;
              console.log('바뀐 리스트 확인', this.reviewList);

            // 댓글 더보기에 사용할 요소 추가
              this.reviewList.forEach(list => {
                list.isShow = false
                // list.comments = [];
                list.commentLength = ''; // 댓글이 없습니다에 사용될 변수
              });

              this.review.title = '';
              this.review.contents = '';

              this.$forceUpdate();
            } else {
              alert(message);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      deleteReview(reviewId, idx) {
        const isDelete = confirm('삭제하시겠습니까?');
        if (isDelete) {
          (async () => {
            // this.reviewList.splice(idx, 1);
            console.log('이건 인덱스', idx);
            try {
              let response =
                this.$axios.delete(`${ this.url }/reviews/delete/${ this.$route.params.id }/${ reviewId }`);
              
              console.log('삭제결과', response);
              // 삭제 후 새 데이터 받아오기(서버에서 오류가 생겨서 다시 요청해야 함)
              if(response.data.code === 200) {
                response =
                    await this.$axios.get(`${ this.url }/reviews?productId=${ this.$route.params.id }`)
                console.log('댓글 삭제 후 재요청으로 받아온 리스트', response);
              } else {
                alert(response.data.message);
              }

           // response.data.code === 200
              //   ? this.reviewList[idx] = response.data.result
              //   : alert( response.data.message);
            } catch (err) {
              console.log(err);
            }
          })();
        } else {
          return false;
        }
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
        console.log('리뷰id확인', reviewId);
        console.log('인덱스확인', idx);
        // v-if가 아닌 v-show를 써야 했다
        // v-if를 쓰니까 textarear가 존재하질 않는다. 
        console.log('클래스 이름으로 확인', document.getElementsByClassName('comment'));
        
        // v-for로 반복을 돌렸으므로 v-model로는 처리불가
        // data옵션에 정의하면 모든 v-for요소들이 상태를 공유하게 된다.

        this.comment.reviewId = reviewId;
        this.comment.userId = this.id;
        this.comment.contents = document.getElementsByClassName('comment')[idx].value;

        if(!this.comment.contents) {
           alert('댓글을 입력해주세요');
           return false;
        }
        (async () => {
          try {
            const response = await this.$axios.post(`${ this.url }/reviews/comments`, this.comment);
            console.log(response);
            const { code, message } = response.data;

            if (code === 201) {
              console.log('새로 받아온 코멘트 확인', response.data.result)
              this.reviewList[idx].comments = response.data.result;

              document.getElementsByClassName('comment')[idx].value = '';
              // 댓글이 없습니다 안 보이게 처리
              this.reviewList[idx].commentLength = ''
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
        console.log('삭제할 코멘트 확인', commentId)
        const isDelete = confirm('삭제하시겠습니까?');
        if( !isDelete) { return false; }
        
        (async () => {
          try {
            const response = await this.$axios.delete(`${ this.url }/reviews/deleteComment/${ reviewId }/${ commentId }`);
            console.log(response);

            // 삭제했으면 새로 댓글 리스트를 받아온다.
            response.data.code === 200
              ? this.reviewList[reviewIdx].comments = response.data.result
              : alert(response.data.message);

            this.$forceUpdate();
          } catch(err) {
            console.log(err);
          }
        })();
      }
    },
    computed: {
      ...mapState(['isLogin', 'id', 'userId', 'url'])
    },
    created() {
      (async () => {
        try {
          const response = await this.$axios.get(`${ this.url }/reviews?productId=${ this.$route.params.id }`)
          console.log('리뷰리스트', response.data);
          if(response.data.code === 200) {
            this.reviewList = response.data.result;
          
          response.data.length < 1
            ? this.reviewLength = '리뷰가 없습니다.'
            : this.reviewLength = '';

            // 댓글 더보기에 사용할 요소 추가
            this.reviewList.forEach(list => {
              list.isShow = false
              // list.comments = [];
              list.commentLength = ''; // 댓글이 없습니다에 사용될 변수
            })
          } else {
            alert(response.data.message);
          }

        } catch (err) {
          console.log(err);
        }
      })();
    }
  }
</script>