
<template>
<!-- 페이스북 로그인 테스트용 컴포넌트 -->
    <div class="site-section" id="fb-root">
        <button type="button"  v-on:click="checkLoginState"  class="btn btn-info block full-width m-b">Facebook</button>
        <div class="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="" data-use-continue-as=""></div>
    </div>
</template>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v6.0"></script>
<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
  export default {
      methods:{
          checkLoginState:function(){
    
            FB.getLoginStatus(function (response) {

                // 이미 페이스북에 로그인 된 상태인경우
                if (response.status == 'connected') {
                    
                    var token = response.authResponse.accessToken;
                    var fbUserID = response.authResponse.userID;
                    console.log("Token:" + token);
                    console.log("UserID:" + fbUserID);

                    //페이스북 로그인 사용자 정보 조회
                    var meURL = '/me?fields=id,name,email,picture';

                    FB.api(meURL, function (response) {

                        console.log(response);
                        console.log('id:' + response.id);
                        console.log('name:' + response.name);
                        console.log('email:' + response.email);
                        console.log('picture:' + response.picture.data.url);
                
                        if (response.email == null) {
                            alert("이메일 주소 정보가 전달되지 않아 로그인이 불가합니다.");
                        } 
                        else 
                        {
                            
                            //사용자 시스템 회원가입 및 로그인 처리
                        }
                    }, { scope: 'email', return_scopes: true });

                } 
                else {

                    //페북 비로그인상태이거나 TTD 미가입자인경우 로그인유도 후 데이터처리
                    FB.login(function (response) {

                        if (response.authResponse) {
                            
                
                            var meURL = '/me?fields=id,name,email,picture';

                            FB.api(meURL, function (response) {
                                // 로그인 후에 이용자 정보가 넘어오는지 확인
                            console.log(response);
                            console.log('id:' + response.id);
                            console.log('name:' + response.name);
                            console.log('email:' + response.email);
                            console.log('picture:' + response.picture.data.url);
                            
                                $("#hidLoginType").val("F");
                                $("#hidSNSEmail").val(response.email);
                                $("#hidSNSName").val(response.name);
                                $("#hidSNSImgURL").val(response.picture.data.url);

                                if (response.email == null) {
                                    alert("이메일 주소 정보가 전달되지 않아 회원가입이 불가합니다.");
                                    location.href = "/member/login";
                                } else {
                                    //사용자 시스템 회원가입 및 로그인 처리
                                }

                            });

                        } 
                        else 
                        {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, { scope: 'email', return_scopes: true });
                }
            
            });
            // 코드 위치 수정 테스트: 삭제하기
               FB.getLoginStatus(function(response) {
            console.log(response);
        });

          }
      },

      created: function() {
        // 페이스북 인증 초기화 
        window.fbAsyncInit = function() {
        FB.init({
            appId      : '2529159693995093',
            xfbml      : true,
            version    : 'v6.0'
        });

        // 사용자의 페이스북 로그인 여부를 알아낸다
        // 로그인 되어있을 경우에는 엑세스 토큰을 가져오고, status: "connected"
        // 로그인 되어있지 않을 경우에는 status: "not_authorized"
        FB.getLoginStatus(function(response) {
            console.log(`getloginstatus의 콜백`, response);
            // 로그인 여부에 따라 행동을 분기
            if(response.status === 'connected') {
                console.log('페북로그인 중');
                // 로그인 되어 있는 상태이므로 store에서 로그인 상태로 해 놓기
            } else {
                console.log('페북 로그인x')
                // 로그인 안 되어 있는 상태이므로 store에서 로그아웃 상태로 해 놓기
            }
        });

    };
        // 페이스북 SDK 로드
        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        // alert('js='+js);
        console.log('fjs='+fjs);
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        // this.checkLoginState();
  }


  }

</script>