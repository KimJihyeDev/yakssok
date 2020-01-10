<template>
    <header>
        <div class="site-wrap">

            <div class="site-mobile-menu site-navbar-target">
              <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                  <span class="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div class="site-mobile-menu-body"></div>
            </div>
        
        
            
            <div class="header-top">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-12 text-center">
                    <router-link to="/" class="site-logo">
                      <img src="/assets/images/logo.png" alt="Image" class="img-fluid">
                    </router-link>
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
                    <nav class="site-navigation position-relative text-left" role="navigation">
                      <ul class="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                        <li class="active"><router-link to="/" class="nav-link text-left">Home</router-link></li>
                        <!-- 부트스트랩 드랍다운  -->
                        <!-- <li role="presentation" class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">
                              Dropdown <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <a>add</a>
                            </ul> 
                        </li> -->

                        <!-- 부트스트랩 끝  -->
                        
                        <!-- 커스텀 부트스트랩 드랍다운 시작 -->
                        <li class="custom-dropdown">
                            <a class="droptbtn">영양제</a>
                            <div class="dropdown_content">
                                <router-link to="Header">비타민</router-link>
                                <router-link to="Header">비타민</router-link>
                                <router-link to="Header">비타민</router-link>
                            </div>
                        </li>

                        <!-- 커스텀 드랍다운 끝 -->
                        <li><router-link to="/" class="nav-link text-left">의약품</router-link></li>
                        <li><router-link to="map" class="nav-link text-left">약국찾기</router-link></li> 
                        <li><router-link to="/" class="nav-link text-left">의학상식</router-link></li> 
                        <li><router-link to="/" class="nav-link text-left">게시판</router-link></li> 
                      </ul>                                                                                                                                                                                                                                                                                         
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


</style>