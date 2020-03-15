
<template>
    <div class="site-section">
        <button type="button"  v-on:click="checkLoginState"  class="btn btn-info block full-width m-b">Facebook</button>
    </div>    
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
  export default {
      methods:{
          checkLoginState:function(){
    
            FB.getLoginStatus(function (response) {

                // 이미 페이스북에 로그인 된 상태인경우
                if (response.status == 'connected') {
                    
                    //alert("connected");

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
                else 
                {

                    //alert("not yet connected");

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
        // 페이스북 인증 초기설정  
        window.fbAsyncInit = function() {
        FB.init({
            appId      : '2529159693995093',
            xfbml      : true,
            version    : 'v2.7'
        });

        // FB.getLoginStatus(function(response) {
        //     console.log(response);
        // });

    };

        (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        alert('js='+js);
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