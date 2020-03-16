<template>
  <div id="app">
    <Header/>
    <!-- 라우트의 파라미터가 바뀌었을 때를 위한 key설정 -->
    <router-view :key="$route.fullPath" />
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
}
</script>

<style>
</style>
