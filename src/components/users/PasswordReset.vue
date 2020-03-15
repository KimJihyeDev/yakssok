<template>
  <div class="site-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 mb-5 mb-md-0">
          <h2 class="h3 mb-3 text-black font-heading-serif">새 비밀번호 설정</h2>
          <div class="p-3 p-lg-5 border">
            <div class="form-group row">
              <div class="col-md-12">
                <label for="c_lname" class="text-danger font-weight-bold" v-if="token">
                  잘못된 비밀번호 재설정 링크를 클릭한 것 같습니다. 다시 시도하십시오.
                </label>
                <label for="c_lname" class="text-black font-weight-bold">회원가입시 입력한 이메일 주소로
                    새 비밀번호 설정 링크가 전송됩니다.
                </label>
                <label for="c_lname">
                    (테스트를 위해 링크는 유효시간을 1분으로 설정해놓았습니다)
                </label>
                <div class="input-group">
                  <input type="text" class="form-control mr-0" id="c_code" placeholder="이메일 주소를 입력해 주세요"
                    aria-label="Coupon Code" aria-describedby="button-addon2" ref="email" v-model="user.email"
                    maxlength="50" @keyup.enter="resetPassword">
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-sm rounded px-4" type="button" id="button-addon2"
                      @click="resetPassword">전송</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 alert alert-danger text-center mt-2" role="alert" v-if="errors">
                {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
import store from '@/store'
import axios from 'axios'
import { mapState } from 'vuex'
  export default {
    name: 'PasswordReset',
    data() {
      return {
        errors: '',
        message: '',
        user: {
            email: '',
        },
        token: false,
      }
    },
    methods: {
        checkEmail() {
            // 폼과 유효성 체크
            if (!this.user.email) {
              this.errors = true;
              this.message = '변경할 이메일 주소를 입력해주세요';
              this.$refs.email.focus();
              return null;
            } else {
              const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
              const validation = reg.test(this.user.email.replace(/(\s*)/g, ""));
              if (!validation) {
                this.errors = true;
                this.message = '이메일 형식을 확인해 주세요.';
                this.$refs.email.focus();
                return false;
              } else {
                this.errors = false;
                this.message = '';
                return true;
              }
            }
        },
        resetPassword() {
            const check = this.checkEmail();
            if(!check) return false;

            (async () => {
                try {
                    const response = 
                        await this.$axios.post(`${ this.url }/users/resetPwd`, this.user);
                    
                    const { code, message } = response.data;
                    if(code === 200) {
                        alert(message);
                        this.user.email = '';
                    } else {
                        this.errors = true;
                        this.message = message;
                    }
                } catch(err) {
                    console.log(err);
                }
            })();
        }
    },
    computed:{
      ...mapState(['id', 'userId', 'url'])
    },
    created(){
      const token = this.$route.query.token;
      console.log('쿼리', token)
      if(token) {
        // 토큰이 있다면 경고 메시지를 출력한다(상단에)
        this.token = true;
      }
    }
  }
</script>
