<template>
    <header>
        <div class="site-wrap">

            <div class="site-mobile-menu site-navbar-target"  style="height: 20%;">
              <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                  <span class="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div class="site-mobile-menu-body"></div>
            </div>
        
        
            
            <div class="header-top">
              <div class="container" >
                <div class="row align-items-center">
                  <!-- <div class="col-12 text-center"> -->
                    <!-- 네비게이션 높이 조절 -->
                  <div class="col-12 site-logo" style="height:30px;">
                    <router-link to="/" class="site-logo">
                      <img src="/assets/images/logo.png" alt="Image" class="img-fluid">
                    </router-link>
                      <div class="col-lg-6 layer" style="display: inline;">
                        <div class="input-group row text-center">
                          <input type="text" class="form-control" placeholder="Search for..." style="margin-right:0px ;">
                            <input class="btn btn-default" type="button" value="go">
                        </div>
                      </div>

                      <div style="display:inline-block;float:right">
                        <input class="btn btn-default" type="button"  value="로그인">
                        <input class="btn btn-default" type="button" style="margin-left:0.5em;" value="마이페이지">                      
                      </div> 
                  </div>
                  <a href="#" class="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                        class="icon-menu h3"></span></a>
                </div>
              </div>
             
              <div class="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">
        
              <div class="container">
                <div class="d-flex align-items-center">
                  
                  <div class="mx-auto">
                      <!-- 변경 -->
                    <nav class="site-navigation position-relative text-right" role="navigation">
                      <ul class="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none" style="inline-block">
                        <li class="active"><router-link to="/" class="nav-link text-left">Home</router-link></li>
                        
                        <!-- 커스텀 부트스트랩 드랍다운 시작 -->
                        <!-- <li class="custom-dropdown" style="translate: 1;"> -->
                        <li class="custom-dropdown nav-link">
                            <router-link  to="/" class="droptbtn ">로컬환경</router-link>
                            <div class="dropdown_content">
                                <router-link to="/">비타민</router-link>
                                <router-link to="/">비타민</router-link>
                                <router-link to="/">비타민</router-link>
                            </div>
                        </li>

                        <!-- 커스텀 드랍다운 끝 -->
                        <li><router-link to="/" class="nav-link text-left">의약품</router-link></li>
                        <li><router-link to="map" class="nav-link text-left">약국찾기</router-link></li> 
                        <li><router-link to="/" class="nav-link text-left">의학상식</router-link></li> 
                        <li><router-link to="/" class="nav-link text-left">게시판</router-link></li> 
                      </ul>   
                      <!--  -->
                     
                    </nav>
                    
                  </div>
                 
                </div>
              </div>
        
            </div>
            
            </div>
            </div>



    </header>
</template>

<script>
export default{
    name: 'Header'
}


</script>

<style scoped>
  /* 드랍다운 스타일 설정 */
.dropdown_content
{
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
}
.custom-dropdown:hover .dropdown_content{
    display: block;
}
.dropdown_content a{
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    font-weight: 400;
}

/*  */
.layer{
  position:absolute;
  top:100%;
  left:50%;
  transform:translate(-50%, -50%)
}
</style>