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
        <div class="container padding-control">
          <div class="row align-items-center">
            <div class="col-12 text-center">
            <!-- router-link로 교체시 로고가 출력되지 않으므로 변경 금지 -->
              <a :href="`/`" class="site-logo">
                <img src="/assets/images/logo.png" alt="Image" class="img-fluid" >
              </a>
            </div>
            <div class="col-12">
              <div class="pull-right">
                <!-- <button class="btn btn-white btn-sm text-right" type="button" @click="loginLogout">{{ loginState }}</button> -->
                <button class="btn btn-white btn-sm text-right" type="button" @click="loginLogout" v-if="isLogin">로그아웃</button>
                <button class="btn btn-white btn-sm text-right" type="button" @click="loginLogout" v-else-if="!isLogin">로그인</button>
                <!-- <router-link tag="button" :to="{ name: 'profile' }" class="btn btn-white btn-sm text-right" style="margin-left:3px;">마이페이지</router-link> -->
                <button type="button" class="btn btn-white btn-sm text-right" style="margin-left:3px;" @click="profile">마이페이지</button>
              </div>
            </div>
            <!-- 모바일 화면으로 전환시 네이게이션바 설정 -->
            <a href="#" class="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                class="icon-menu h3 navbar-position"></span></a>
          </div>
        </div>
        <!-- searchform start  -->
        <div class="row col-lg-12 mx-auto">
          <div class="col-lg-6 center-block">
            <div class="input-group">
              <input type="text" class="form-control margin-control" @keyup.enter="searchProduct" placeholder="Search for..." v-model="search">
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
                    <li class="active"><router-link :to="{ name: 'main' }"  class="nav-link text-left" style="font-size:1.2rem;">Home</router-link></li>
                    <!-- dropdown start -->
                    <div class="btn-group">
                      <li class="btn btn-default" data-toggle="dropdown" aria-expanded="false" >
                        <a href="#" class="nav-link nav-style" style="padding-left:8px;font-size:20px;font-weight:600;color:#212529;"> 영양제</a>
                      </li>
                      <ul class="dropdown-menu" role="menu">
                        <li><router-link :to="{ name: 'category', params: { parent_id: 1, child_id: 1 }}" class="nav-style">비타민</router-link></li>
                        <!-- <li class="divider"></li> -->
                        <li><router-link :to="{ name: 'category', params: { parent_id: 1, child_id: 2 }}" class="nav-style">프로바이오틱스</router-link></li>
                      </ul>
                    </div>
                    <!-- dropdown end -->
                    <li><router-link :to="{ name: 'category', params: { parent_id: 2, child_id: 1}}" class="nav-link text-left" style="font-size:20px;font-weight:600;color:#212529;">동물영양제</router-link></li>
                    <li><router-link :to="{ name: 'map' }" class="nav-link text-left" style="font-size:20px;font-weight:600;color:#212529;">약국찾기</router-link></li>
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
import { mapState } from 'vuex'
  export default {
    name: 'Header',
    data(){
      return {
        search: ''
      }
    },
    methods:{
      profile(){
        this.$router.push('/profile');
      },
      loginLogout(){
        // store는 새로고침되면 초기화되므로 
        // store로 로그인 판별x
        this.isLogin === true
          ? this.$store.commit('logout')
          : this.$router.push('/login')
      },
      searchProduct(){
        console.log(this.search);
        if(this.search){
          this.$router.push({ name: 'search' , query: {keyword: this.search}})
        } else {
          return false;
        }

      }
    },
    computed:{
      ...mapState(['isLogin', 'url']),
    },
    watch:{
    },
  }

</script>

<style scoped>
  /* 검색창 화면 중앙 정렬 */
  .center-block {
    float: none;
    margin: 0 auto
  }
  /* 검색버튼 margin 조절 */
  .margin-control {
    margin-right: 0;
  }
  /* 모바일 버전에서 네이게이션바 위치 조절 */
  .navbar-position {
    position: absolute;
    right: 80% !important;
    top: 40px !important;
  }
  /* 로그인 버튼 위치 조절 */
  .pull-right {
    float: right !important;
  }
  /* 헤더 요소들의 패딩 조절:네이게이션과 검색창간의 거리 조절 */
  .padding-control {
    padding-bottom: 2px;
  }
</style>