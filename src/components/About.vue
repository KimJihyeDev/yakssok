<template>
  <div style="margin-top:100px;">
    <div class="row justify-content-center">
      <div class="col-md-10">
          <div class="col-md-12">
              <div class="col-md-12 text-center">
                <h2 class="h3 mb-3 text-black font-heading-serif text-black font-weight-bold">기술 스펙</h2>
                <div class="p-3 p-lg-5 border">
                  <table class="table site-block-order-table mb-5">
                    <tr>
                      <td class="text-black font-weight-bold"><strong>Front-End</strong></td>
                      <td class="text-black font-weight-bold"><strong>Vue.js(Vue CLI 4)</strong></td>
                    </tr>
                    <tbody>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Back-End</strong></td>
                        <td class="text-black font-weight-bold"><strong>Node.js(Express Framework)</strong></td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>DB</strong></td>
                        <td class="text-black font-weight-bold"><strong>MySQL(Sequelize ORM)</strong></td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Cloud</strong></td>
                        <td class="text-black font-weight-bold"><strong>Azure</strong></td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Git</strong></td>
                        <td class="text-black font-weight-bold"><a href="https://github.com/KimJihyeDev"><strong>https://github.com/KimJihyeDev</strong></a></td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>참고사이트(제품정보)</strong></td>
                        <td class="text-black font-weight-bold"><strong>NOW Foods, iHerb</strong></td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>참고사이트(리뷰, 댓글)</strong></td>
                        <td class="text-black font-weight-bold"><strong>Daum(kakao)</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import axios from 'axios'
  import store from '@/store'
  import router from '@/router/routes'
  export default {
    name: 'about',
    data() {
      return {
      }
    },
    created() {

    },
  }
</script>