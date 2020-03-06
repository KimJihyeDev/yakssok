<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid lightgray;margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <div class="form-group">
                <span class="font-weight-bold" style="font-size:2rem;">로그인</span>
                <hr class="solid">
                <label for="exampleDropdownFormEmail1">아이디/이메일</label>
                <input type="text" class="form-control" ref="id" v-model="user.user_id_email" placeholder="아이디 또는 이메일 주소를 입력해주세요." 
                    @keyup.enter="login">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input type="password" class="form-control" ref="pwd" v-model="user.user_pwd" placeholder="비밀번호를 입력해주세요." 
                    @keyup.enter="login">
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block" @click="login">로그인</button>
        </form>
        <div class="dropdown-divider"></div>
        <div class="alert alert-danger text-center" role="alert" v-if="errors || isError" style="margin-top:1rem;">
            {{ message || errorMessage }}
        </div>
        <div class="text-center">
            <router-link class="btn btn-default btn-lg" tag="button" :to="{ name: 'register' }" style="margin-right:1rem;">회원가입</router-link>
            <router-link class="btn btn-default btn-lg" tag="button" :to="{ name: 'passwordreset' }">비밀번호 찾기</router-link>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import store from '@/store'
import { mapState } from 'vuex'
    export default {
        name: 'login',
        data(){
            return {
                user: {
                    user_id_email: '',
                    user_pwd: ''
                },
                errors: false,
                message: '',
            }
        },
        methods: {
            checkForm() {
                const vm = this;
                const checkNull = (message, ref) => {
                        vm.errors = true;
                        vm.message = `${ message } 입력해 주세요`
                        ref.focus();
                        return false; 
                }

                if(!this.user.user_id_email) {
                    return checkNull('아이디를', this.$refs.id);
                }
                else if(!this.user.user_pwd) {
                    return checkNull('비밀번호를', this.$refs.pwd); 
                }
                else {
                    this.errors = false;
                    this.message = '';
                }
                return true;
            },
            login() {
                const check = this.checkForm();
                if(!check) return false;

                (async () => {
                    try {
                        const result = 
                            await this.$axios.post(`${ store.state.url }/users/login`, this.user)
                        console.log('로그인 컴포넌트에서 결과 확인', result);
                        const { code, message, token, id } = result.data;
                        console.log('로그인 컴포넌트에서 id 확인', id);
                        
                        if (code === 200) {
                            store.commit('login', { token, id });
                            this.$router.push({ name: 'main' });
                        }
                        else {
                            store.commit('loginError', result);
                            console.log(message)
                        }
                    } catch (err) {
                        console.log(err);
                    }
                })();
            }
        },
        computed: {
            ...mapState(['isError', 'errorMessage']),
        },
        beforeRouteEnter(to, from, next){
            const isLogin = store.getters.getloginState;
            isLogin
                ? next({ name: 'profile' })
                : next()
        }
    }
</script>