<template>
    <div class="site-section">
        <div class="col-lg-6 mx-auto p-4 border">
            <form class="px-4 py-3">
                <span class="font-weight-bold">회원가입</span>
                <hr class="solid">
                
                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">아이디<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" ref="id" v-model="user.user_id" maxlength="8" 
                        placeholder="2자 이상 8자 이하의 영문 또는 숫자만 입력해주세요." @keyup.enter="register">
                </div>

                <div class="form-group">
                    <label for="exampleDropdownFormEmail1">이메일<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" ref="email" v-model="user.email" placeholder="email@example.com"
                        @keyup.enter="register">
                </div>

                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">비밀번호<span class="text-danger">*</span></label>
                    <input type="password" class="form-control" ref="pwd" v-model="user.user_pwd" placeholder="비밀번호를 입력해 주세요."
                        @keyup.enter="register">
                </div>

                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">비밀번호 확인<span class="text-danger">*</span></label>
                    <input type="password" class="form-control" ref="confirm_pwd" v-model="confirm_pwd" placeholder="비밀번호를 다시 입력해 주세요."
                        @keyup.enter="register">
                </div>

                <hr class="solid">
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="register">회원가입</button>
            </form>
            <div class="alert alert-danger text-center mt-3" role="alert" v-if="errors">
                {{ message }} 
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
    export default {
        name: 'register',
        data(){
            return {
                user: {
                    user_id:'',
                    user_pwd: '',
                    email:''
                },
                confirm_pwd: '', // 비밀번호 확인
                errors: false,
                message: '',
                isTest: true
            }
        },
        methods:{
            checkForm() {
                  // 널값체크
                const checkNull = (message, ref) => {
                    this.errors = true;
                    this.message = `${ message } 입력해 주세요.`;
                    ref.focus();
                    return false;
                }

                if (!this.user.user_id) {
                    return checkNull('아이디를', this.$refs.id);
                } 
                else if (!this.user.email) {
                    return checkNull('이메일을', this.$refs.email); 
                } 
                else if (!this.user.user_pwd) {
                    return checkNull('비밀번호를', this.$refs.pwd);
                } 
                else if (!this.confirm_pwd) {
                    return checkNull('비밀번호 확인을', this.$refs.confirm_pwd);
                } 
                else if (this.user.user_pwd !== this.confirm_pwd){
                    this.errors = true;
                    this.message = '비밀번호가 일치하지 않습니다.'
                    this.$refs.pwd.focus();
                    return false;
                } 
                else {
                    this.errors = false;
                    this.message = '';
                }   

                // 유효성 검사
                if(this.user.user_id) {
                    const reg =  /^[0-9A-za-z]{2,8}$/g;
                    const validation = reg.test(this.user.user_id.replace(/(\s*)/g, ""));
                    if(!validation) {
                        this.errors= true;
                        this.message = '아이디는 2자 이상 8이하의 영문 또는 숫자만 입력해 주세요.';
                        this.$refs.id.focus();
                        return false;
                    }
                } 
                if(this.user.email) {
                    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                    const validation = reg.test(this.user.email.replace(/(\s*)/g, ""));
                    if(!validation) {
                        this.errors = true;
                        this.message = '이메일 형식을 확인해 주세요.';
                        this.$refs.email.focus();
                        return false;
                    }
               }
               // 전부 통과한 경우    
               return true;
            },
            register(){
                const check = this.checkForm();
                if(!check) return false;

               (async () => {
                    try {
                        const result = await this.$axios.post(`${ store.state.url }/users`, this.user)
                        const { code, message } = result.data;

                        if(code === 201){
                            const token = result.data.token;
                            const { id } = result.data;
                            store.commit('login', token, id);
                            this.$router.push('/');
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
        beforeRouteEnter(to, from, next){
            const isLogin = store.getters.getloginState;
            isLogin
                ? next({ name: 'profile' })
                : next()
        }
    }
</script>