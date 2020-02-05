<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  created(){
  }
}
</script>

<style>
</style>
