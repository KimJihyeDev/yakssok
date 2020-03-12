<template>
  <div class="site-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 mb-5 mb-md-0">
          <h2 class="h3 mb-3 text-black font-heading-serif">프로필</h2>
          <div class="p-3 p-lg-5 border">
            <div class="form-group">
              <label for="c_country" class="text-black">사용자 ID </label>
              <input type="text" class="form-control" :value="`${ this.userId }`" disabled>
            </div>
            <!-- 비밀번호 변경 -->
            <div class="form-group row">
              <div class="col-md-12">
                <label for="c_lname" class="text-black">비밀번호 변경</label>
                <div class="input-group">
                  <input type="password" class="form-control" placeholder="현재 비밀번호를 입력해 주세요"
                    aria-label="Coupon Code" aria-describedby="button-addon2" ref="currentPwd" v-model="newProfile.currentPwd"
                    @keyup.enter="modifyPwd">
                  <input type="password" class="form-control" placeholder="새 비밀번호를 입력해 주세요"
                    aria-label="Coupon Code" aria-describedby="button-addon2" ref="newPwd" v-model="newProfile.pwd"
                    @keyup.enter="modifyPwd">
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-sm rounded px-4" type="button" id="button-addon2"
                      @click="modifyPwd">변경</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <label for="c_fname" class="text-black">이메일</label>
                <input type="text" class="form-control" id="c_fname" name="c_fname" :value="`${ currentEmail }`"
                  disabled>
              </div>
            </div>
            <!-- 이메일 변경  -->
            <div class="form-group row">
              <div class="col-md-12">
                <label for="c_lname" class="text-black">이메일 변경</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="c_code" placeholder="새 이메일 주소를 입력해 주세요"
                    aria-label="Coupon Code" aria-describedby="button-addon2" ref="email" v-model="newProfile.email"
                    maxlength="50" @keyup.enter="modifyEmail">
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-sm rounded px-4" type="button" id="button-addon2"
                      @click="modifyEmail">변경</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="input-group-append justify-content-center">
              <button class="btn btn-danger btn-sm rounded px-4" type="button" id="button-addon2"
                      @click="deleteAccount">회원 탈퇴</button>
            </div>
            <div class="col-md-12 alert alert-danger text-center" role="alert" v-if="errors" style="margin-top:1rem;">
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
    name: 'profile',
    data() {
      return {
        errors: '',
        message: '',
        newProfile: {
          email: '',
          pwd: '',
          currentPwd: '',
        },
        currentEmail: '',
      }
    },
    methods: {
      notError() { 
        this.errors = false;
        this.message = '';
      },
      error(message) {
        this.errors = true;
        this.message = message;
      },
      getProfile() {
        (async () => {
          try {
            // 토큰은 라우트에서 확인 했으니 id로 프로필 조회
              const id = store.getters.getId;
              console.log('created에서 id 확인', id);
              const result = await axios.post(`${ store.state.url }/users/profile`, { id });
              const { code, message, email }= result.data;
              console.log('프로필 요청결과', result);
              if(code === 200) {
                this.currentEmail = email;
              } else {
                alert(message);
              }
          } catch (err) {
              console.log(err);
          }
        })();
      },
      notLogin() {
          alert('로그인 되어있지 않습니다. 다시 로그인 해주세요.');
          this.$router.push({ name: 'login' });
          return false;
      },
      checkEmail() {
        // 폼과 유효성 체크
        if (!this.newProfile.email) {
          const message = '변경할 이메일 주소를 입력해주세요';
          this.error(message);
          this.$refs.email.focus();
          return null;
        } else {
          const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
          const validation = reg.test(this.newProfile.email.replace(/(\s*)/g, ""));
          
          if (!validation) {
            const message = '이메일 형식을 확인해 주세요.';
            this.error(message);
            this.$refs.email.focus();
            return false;
          } else {
            this.notError();
            return true;
          }
        }
      },
      modifyEmail() {
        const check = this.checkEmail();
        if(!check) return false;

        (async () => {
          try {
            await store.dispatch('auth');
            const isLogin = store.getters.getloginState;
            if(!isLogin) return this.notLogin();

            this.newProfile.id = store.getters.getId;
            const response = 
                await this.$axios.patch(`${ this.url }/users/modify/${ this.id }?type=e`, this.newProfile);

            const { code, message } = response.data;
            if(code === 200) {
              alert(message);
              this.newProfile.email = '';
              this.getProfile();
              this.notError();
            } else {
              // 이미 사용 중인 이메일의 경우
              this.error(message);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      },
      checkPwd() {
        if (!this.newProfile.currentPwd || !this.newProfile.pwd) {
          const message = '비밀번호를 입력해 주세요.';
          this.error(message);
          return false;
        } else {
          this.notError();
          return true;
        }
      },
      modifyPwd() {
        const check = this.checkPwd();
        if(!check) return false;

        (async() => {
          try {
            // 토큰 유효성 확인 
            await store.dispatch('auth');
            const isLogin = store.getters.getloginState;
            if(!isLogin) return this.notLogin();

            const response = 
              await this.$axios.patch(`${ this.url }/users/modify/${ this.id }?type=p`, this.newProfile);
            console.log(response);
            const { code, message } = response.data;
            if(code === 200) {
              this.newProfile.currentPwd = '';
              this.newProfile.pwd = '';
              alert(message);
              this.notError();
            } else {  
              // 비밀번호가 일치하지 않는 경우
              this.error(message);
            }
          } catch(err) {
            console.log(err);
          }
        })();
      },
      deleteAccount() {
        // confirm으로 확인
        // 맞다면 토큰 유효성 확인
        // 그 후에 서버에 탈퇴 요청 보내기
        const isDeleteAccount = 
          confirm('탈퇴하시면 계정을 복구하실 수 없습니다. 정말 탈퇴하시겠습니까?');
        if(!isDeleteAccount) return false;
        
        (async () => {
          try {
            await store.dispatch('auth');
            const isLogin = store.getters.getloginState;
            if(!isLogin) return this.notLogin();

            const response = 
              await this.$axios.delete(`${ this.url }/users/deleteAccount/${ this.id }`);
            
            const { code, message } = response.data;

            if(code === 200) {
              alert(message);
              store.commit('logout');
              this.$router.push({ name: 'main' });
            } else {
              // 서버 에러 처리
              this.error(message);
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
    created() {
        this.getProfile();
    },
  }
</script>