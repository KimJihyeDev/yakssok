<template>
    <div class="col-lg-6 mx-auto p-4"
        style="border:1px solid gray; margin-top:8em;margin-bottom:8em;height:100%;padding-top:2rem;padding-bottom:2rem;">
        <form class="px-4 py-3">
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">아이디</label>
                <input type="text" class="form-control" placeholder="2자 이상 8자 이하의 영문과 숫자만 입력해주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormEmail1">이메일</label>
                <input type="email" class="form-control" placeholder="email@example.com">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호</label>
                <input type="password" class="form-control" placeholder="2자 이상 입력해 주세요.">
            </div>
            <div class="form-group">
                <label for="exampleDropdownFormPassword1">비밀번호 확인</label>
                <input type="password" class="form-control" placeholder="비밀번호를 다시 입력해 주세요.">
            </div>
            <button type="button" class="btn btn-primary" @click="login">회원가입</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'entry'
    }
</script>