<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid lightgray; margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">아이디</label>
                <input type="text" class="form-control" ref="id" v-model="user.user_id" maxlength="8" placeholder="2자 이상 8자 이하의 영문 또는 숫자만 입력해주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">이메일</label>
                <input type="email" class="form-control" ref="email" v-model="user.email" placeholder="email@example.com">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input type="password" class="form-control" ref="pwd" v-model="user.user_pwd" placeholder="비밀번호를 입력해 주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호 확인</label>
                <input type="password" class="form-control" ref="confirm_pwd" v-model="confirm_pwd" placeholder="비밀번호를 다시 입력해 주세요.">
            </div>
            <button type="button" class="btn btn-primary" @click="entry">회원가입</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'entry',
        data(){
            return {
                user: {
                    user_id:'',
                    user_pwd: '',
                    email:''
                },
                confirm_pwd: '', // 비밀번호 확인
            }
        },
        methods:{
            entry(){
                // 널값체크
                if(this.user.user_id === '') {
                    alert('아이디를 입력해 주세요.');
                    this.$refs.id.focus();
                    return false;
                } else if(this.user.user_pwd === '') {
                    alert('비밀번호를 입력해 주세요.');
                    this.$refs.pwd.focus();
                    return false;
                } else if(this.confirm_pwd === '') {
                    alert('비밀번호 확인을 입력해 주세요.');
                    this.$refs.confirm_pwd.focus();
                    return false;
                } else if(this.user.email === '') {
                    alert('이메일을 입력해 주세요.');
                    this.$refs.email.focus();
                    return false;
                } else if(this.user.user_pwd !== this.confirm_pwd){
                    alert('비밀번호가 일치하지 않습니다.');
                    this.$refs.pwd.focus();
                    return false;
                }   
                // 유효성 검사
                if(this.user.user_id !== '') {
                    const reg =  /^[0-9A-za-z]{2,8}$/g;
                    const validate = reg.test(this.user.user_id.replace(/(\s*)/g, ""));
                    if(!validate) {
                        alert('아이디는 2자 이상 8이하의 영문 또는 숫자만 입력해 주세요.');
                        this.$refs.id.focus();
                        return false;
                    }
                } 
                if(this.user.email !== '') {
                    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                    const validate = reg.test(this.user.email.replace(/(\s*)/g, ""));
                    if(!validate) {
                        alert('이메일 형식을 확인해 주세요.');
                        this.$refs.email.focus();
                        return false;
                    }
               }
               (async () => {
                    try {
                        const result = await this.$axios.post(`${this.$store.state.url}/users`, this.user)
                        // console.log(result);

                        if(result.data.message === '사용 중인 아이디'){
                            alert('이미 사용 중인 아이디입니다.');
                        } else if (result.data.message === '가입된 이메일'){
                            alert('이미 가입된 이메일입니다.');
                        }
                        
                        if(result.status === 201){
                            alert('가입 축하합니다!!');
                            this.$router.push('/');
                        }
                    }catch(err) {
                       console.log(err);
                    }
               })();
            }
        }
    }
</script>