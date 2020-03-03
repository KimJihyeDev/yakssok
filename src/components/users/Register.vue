<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid lightgray; margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <span class="font-weight-bold" style="font-size:2rem;">회원가입</span>
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
        <div :class="{ test : false }"></div>
        <div class="alert alert-danger text-center" role="alert"  v-if="errors" style="margin-top:1rem;">
            {{ message }} 
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
            register(){
                // 널값체크
                const vm = this;
                let checkNull = (message, ref) => {
                    vm.errors = true;
                    vm.message = `${ message } 입력해 주세요.`;
                    ref.focus();
                }

                if (!this.user.user_id) {
                    checkNull('아이디를', this.$refs.id);
                    return false;
                } else if (!this.user.email) {
                    checkNull('이메일을', this.$refs.email);  
                     return false;  

                } else if (!this.user.user_pwd) {
                    checkNull('비밀번호를', this.$refs.pwd);
                     return false;

                } else if (!this.confirm_pwd) {
                    checkNull('비밀번호 확인을', this.$refs.confirm_pwd);
                    return false;

                } else if (this.user.user_pwd !== this.confirm_pwd){
                    this.errors = true;
                    this.message = '비밀번호가 일치하지 않습니다.'
                    this.$refs.pwd.focus();
                    return false;
                } else {
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
               (async () => {
                    try {
                        const result = await this.$axios.post(`${ store.state.url }/users`, this.user)
                        let code = result.data.code === 409 || result.data.code === 500;
                        if(code){
                            this.errors = true;
                            this.message = result.data.message;
                        }

                        if(result.status === 201){
                            const token = result.data.token;
                            const { id } = result.data;
                            store.commit('login', token, id);
                            this.$router.push('/');
                        }
                        
                    }catch(err) {
                       console.log(err);
                    }
               })();
            }
        },
        beforeRouteEnter(to, from, next){
            store.state.isLogin
                ? next({ name: 'profile' })
                : next()
        }
    }
</script>
<style >
.test {
    height: 100px;
    width : 200px;
   border: 1px solid red;
}
</style>