<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid lightgray;margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <div class="form-group">
                <span class="font-weight-bold" style="font-size:2rem;">로그인</span>
                <hr class="solid">
                <label for="exampleDropdownFormEmail1">아이디/이메일</label>
                <input type="text" class="form-control" ref="id" v-model="user.user_id_email" placeholder="아이디 또는 이메일 주소를 입력해주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input type="password" class="form-control" ref="pwd" v-model="user.user_pwd" placeholder="비밀번호를 입력해주세요.">
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block" @click="login">로그인</button>
        </form>
        <div class="dropdown-divider"></div>
        <div class="alert alert-danger text-center" role="alert" v-if="errors || isError" style="margin-top:1rem;">
            {{ message || errorMessage }}
        </div>
        <!-- <div class="alert alert-danger text-center" role="alert" v-if="isLoginError" style="margin-top:1rem;">
            {{ getErrorMessage }}
        </div> -->
        <div class="text-center">
            <!-- <button class="btn btn-default" href="#" type="button" @click="register" style="margin-right:3px;">회원가입</button> -->
            <router-link class="btn btn-default" tag="button" :to="{ name: 'register' }" style="margin-right:3px;">회원가입</router-link>
            <button class="btn btn-default" href="#" type="button">비밀번호 찾기</button>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import store from '@/store'
import { mapState, mapActions } from 'vuex'
// import axios from 'axios' 
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
            ...mapActions({ commitLogin: 'login' }),
            login() {
                const vm = this;
                let checkNull = (message, ref) => {
                        vm.errors = true;
                        vm.message = `${ message }를 입력해 주세요`
                        ref.focus();
                        // return false; **여기서 return false를 해도 값이 넘어간다**
                }

                if(this.user.user_id_email === ''){
                    checkNull('아이디', this.$refs.id)
                    return false; 
                }
                else if(this.user.user_pwd === '' ){
                    checkNull('비밀번호', this.$refs.pwd);
                    return false; 
                }
                else {
                    this.errors = false
                    this.message = '';
                }
                this.commitLogin(this.user)
                // store.dispatch('login', this.user);
            }
        },
        computed: {
            ...mapState(['isError', 'errorMessage']),
        },
        // beforeRouteEnter 때문에 계속 에러 발생
        beforeRouteEnter(to, from, next){
            store.state.token === null
                ? next()
                : next({ name: 'profile' })

        }
    }
</script>