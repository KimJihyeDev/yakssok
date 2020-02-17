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
        <div class="alert alert-danger text-center" role="alert" v-if="error" style="margin-top:1rem;">
            {{ errorMessage }}
        </div>
        <div class="text-center">
            <button class="btn btn-default" href="#" type="button" @click="register" style="margin-right:3px;">회원가입</button>
            <button class="btn btn-default" href="#" type="button">비밀번호 찾기</button>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
// import axios from 'axios' 
    export default {
        name: 'login',
        data(){
            return {
                user: {
                    user_id_email: '',
                    user_pwd: ''
                },
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            register() {
                this.$router.push('/register');
            },
            login() {
                (async () => {
                    try{
                        if(this.user.user_id_email === ''){
                            this.error = true;
                            this.errorMessage = '아이디 입력해 주세요.';
                            this.$refs.id.focus();
                            return false;
                        }else if(this.user.user_pwd === ''){
                            this.error = true;
                            this.errorMessage = '비밀번호 입력해 주세요.';
                            this.$refs.pwd.focus();
                            return false;
                        }else{
                            this.error = false
                            this.errorMessage = '';
                        }

                        // eslint-disable-next-line no-unreachable
                        const result = await this.$axios.post(`${ store.state.url }/users/login`, this.user)
                        // 토큰의 유무, 발행기간 유효성 여부 등은 login 모듈에서 처리한다
                        
                        console.log(result);
                        console.log(result.data.code);
                        if(result.data.code === 403){
                            this.error = true;
                            this.errorMessage = '아이디 또는 비밀번호를 확인해 주세요';
                            return false;
                        }

                        const token = result.data.token;
                        console.log(token)
                        localStorage.setItem('YAKSSOK-TOKEN', token);

                        store.commit('logIn');
                        this.$router.push('/');

                    }catch(err){
                        console.log(err);
                    }
                }

                )();
            }
        },
        beforeRouteEnter(to, from, next){
            // beforeRouterEnter는 Vue객체가 생성되기 전에 실행되므로
            // this !== Vue. this 키워드 사용에 주의
            // alert('beforeenter')
            // const token = localStorage.getItem('YAKSSOK-TOKEN');
            // if(store.getters.isLoggedIn !== ''){
            //     (async () => {
            //         try{
            //             const result = await axios.get(`${ store.state.url }/users/token`,{ headers: { authorization: token }});
            //             console.log(result);
            //             const payload = result.data.code;
            //             store.commit('validateToken', payload);
            //             next();
            //         }catch(err){
            //             console.log(err);
            //         }
            //      })();
            // }
            next();
        }
    }
</script>