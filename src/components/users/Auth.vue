<template>
    <div>
        <div class="col-lg-6 mx-auto p-4">
            <form class="px-4 py-3">

                <div class="form-group">
                    <span class="font-weight-bold h2">비밀번호 재설정</span>
                    <hr class="solid">
                    <label for="exampleDropdownFormEmail1">비밀번호</label>
                    <input type="password" class="form-control" ref="pwd" v-model="user.pwd" placeholder="비밀번호를 입력해주세요." 
                        @keyup.enter="resetPassword">
                </div>

                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">비밀번호 재입력</label>
                    <input type="password" class="form-control" ref="confirmPwd" v-model="confirmPwd" placeholder="비밀번호를 다시 입력해주세요." 
                        @keyup.enter="resetPassword">
                </div>

                <button type="button" class="btn btn-primary btn-lg btn-block" @click="resetPassword">비밀번호 재설정</button>
            </form>
            <div class="dropdown-divider"></div>
            <div class="alert alert-danger text-center mt-3" role="alert" v-if="errors">
                {{ message }}
            </div>
        </div>
    </div>
</template>


<script>
  /* eslint-disable no-unused-vars */
import store from '@/store'
import router from '@/router/routes'
import axios from 'axios'
import { mapState } from 'vuex'
  export default {
    name: 'Auth',
    data() {
      return {
        errors: '',
        message: '',
        user: {
            pwd: '',
        },
        confirmPwd: '',
        toke: '',
      }
    },
    methods: {
        checkForm() {

            const check = ref => {
                if(!ref.value) {
                    this.errors = true;
                    this.message = '비밀번호를 입력해주세요';
                    ref.focus();
                    return false;
                } else {
                    this.errors = false;
                    this.message = '';
                    return true;
                }
            }

            let result = check(this.$refs.pwd);
            if(!result) return false;

            result = check(this.$refs.confirmPwd);
            if(!result) return false;

            if(this.$refs.pwd.value !== this.$refs.confirmPwd.value) {
                this.errors = true;
                this.message = ('비밀 번호가 일치하지 않습니다.');
                return false;
            } 
            
            return true;
        },
        resetPassword() {
            const check = this.checkForm();
            if(!check) return false;
            else {
                this.errors = false;
                this.message = false;
            }

            const config = { headers: { authorization: this.token }};
            (async () => {
                try {
                    const response = 
                        await this.$axios.patch(`${ this.url }/users/updatePwd`, this.user, config);
                    
                    const { code, message } = response.data;
                    if(code === 200) {
                        alert(message);
                        this.user.pwd = '';
                        this.confirmPwd = '';
                    } else {
                        // 서버에러 처리
                        alert(message);
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
        const token = this.$route.params.token;
        console.log('파라미터', token);
        this.token = token;
        // 서버에 토큰 인증 요청 
        // 인증 성공하면 그대로 비밀번호 재설정으로 진행
        // 실패하면 리다이렉트(resetpwd로)
        const config = { headers: { authorization: token }};
       (async () => {
           try {
                const respnase = 
                    await this.$axios.get(`${ this.url }/users/authToken`, config);

                const { code, message } = respnase.data;
                
                if(code !== 200) this.$router.push(
                    { name: 'passwordreset', query: { token: 'Expired' }}
                );
           } catch(err) {   
               console.log(err);
           }
       })();
    },
    beforeRouteEnter(to, from, next) {
        // 이 단계에서 토큰을 검증하여
        // 토큰이 유효하지 않다면 리다이렉트 하여비밀번호 설정을 보여주지X
        // 로그인 되어 있을 경우에는 profile로 유도
        store.getters.getloginState
            ? router.push({ name: 'profile'})
            : next()
    }
  }
</script>
