<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid gray; margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">아이디/이메일</label>
                <input type="text" class="form-control" placeholder="아이디 또는 이메일 주소를 입력해주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input type="password" class="form-control" placeholder="비밀번호를 입력해주세요.">
            </div>
            <!-- <div class="form-group">
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="dropdownCheck">
            <label class="form-check-label" for="dropdownCheck">
            Remember me
            </label>
        </div>
        </div> -->
            <button type="button" class="btn btn-primary" @click="login">로그인</button>
        </form>
        <div class="dropdown-divider"></div>
        <button class="btn btn-default" href="#" type="button" @click="entry" style="margin-right:3px;">회원가입</button>
        <button class="btn btn-default" href="#" type="button">비밀번호 찾기</button>
    </div>
</template>

<script>
    export default {
        name: 'login',
        methods: {
            entry() {
                this.$router.push('/users/entry');
            },
            login() {

            }
        }
    }
</script>