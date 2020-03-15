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
        <div class="container pb-3">
          <div class="row align-items-center">
            <div class="col-12 text-center">
            <!-- router-link로 교체시 로고가 출력되지 않으므로 변경 금지 -->
              <a :href="`/`" class="site-logo">
                <img src="/assets/images/logo.png" alt="Image" class="img-fluid" >
              </a>
            </div>
            
            <div class="col-12">
              <div class="pull-right">
                <button class="btn btn-white btn-sm text-right" type="button" @click="loginLogout" v-if="getloginState">로그아웃</button>
                <button class="btn btn-white btn-sm text-right" type="button" @click="loginLogout" v-else-if="!getloginState">로그인</button>
                <router-link tag="button" :to="{ name: 'profile' }" class="btn btn-white btn-sm text-right ml-1">마이페이지</router-link>
              </div>
            </div>
            <!-- 모바일 화면으로 전환시 네이게이션바 설정 -->
            <a  class="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                class="icon-menu h3 navbar-position"></span></a>
          </div>
        </div>

        <!-- searchform start  -->
        <div class="row col-lg-12 mx-auto justify-content-center">
          <div class="col-lg-6">
            <div class="input-group">
              <input type="text" class="form-control mr-0" @keyup.enter="searchProduct" placeholder="Search for..." v-model="search">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button" @click="searchProduct">검색</button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <!-- searchform end -->

        <div class="site-navbar py-2 js-sticky-header site-navbar-target d-none pl-0 d-lg-block" role="banner">
          <div class="container">
            <div class="d-flex align-items-center">
              <div class="mx-auto">
                <nav class="site-navigation position-relative text-left" role="navigation">
                  <ul class="site-menu main-menu js-clone-nav mx-auto d-none pl-0 d-lg-block border-none">
                    <li class="active"><router-link :to="{ name: 'main' }"  class="nav-link text-left h5">Home</router-link></li>
                    
                    <!-- dropdown start -->
                    <div class="btn-group">
                      <li class="btn btn-default" data-toggle="dropdown" aria-expanded="false" >
                        <router-link to="" class="nav-link nav-style font-color pointer font-weight-bold" style="padding-left:8px;font-size:20px;font-weight:600;">영양제</router-link>
                      </li>
                      <ul class="dropdown-menu" role="menu">
                        <li><router-link tag="span" :to="{ name: 'category', params: { parent_id: 1, child_id: 1 }}" class="nav-style pointer">비타민</router-link></li>
                        <!-- <li class="divider"></li> -->
                        <li><router-link tag="span" :to="{ name: 'category', params: { parent_id: 1, child_id: 2 }}" class="nav-style pointer">프로바이오틱스</router-link></li>
                      </ul>
                    </div>
                    <!-- dropdown end -->

                    <li><router-link :to="{ name: 'category', params: { parent_id: 2, child_id: 1}}" class="nav-link text-left font-color" style="font-size:20px;font-weight:600;color:">동물영양제</router-link></li>
                    <li><router-link :to="{ name: 'map' }" class="nav-link text-left font-color" style="font-size:20px;font-weight:600;">약국찾기</router-link></li>
                    <li><router-link :to="{ name: 'about' }" class="nav-link text-left text-info font-color" style="font-size:20px;font-weight:600;">사이트정보</router-link></li>
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
import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'Header',
    data(){
      return {
        search: ''
      }
    },
    methods:{
      loginLogout(){
        
        if(this.getloginState) {
          this.$store.commit('logout');
          this.$router.push('/')
        } else {
          this.$router.push('/login')
        }
      },
      searchProduct(){
        console.log(this.search);
        if(this.search){
          this.$router.push({ name: 'search' , query: { keyword: this.search }})
        } else {
          return false;
        }
      }
    },
    computed:{
      ...mapGetters(['getloginState']),
      ...mapState(['url']),
    },
   
  }

</script>

<style scoped>

  /* 모바일 버전에서 네이게이션바 위치 조절 */
  .navbar-position {
    position: absolute;
    right: 80% !important;
    top: 40px !important;
  }
  
  /* a태그 글자가 깨지는 것을 처리 */
  .pointer {
    cursor: pointer;
  }

  /* 네비게이션 폰트 색상 */
  .font-color {
    color:#212529
  }
</style>
