<template>
  <div style="margin-top:100px;">
    <div class="container">
      <div class="row  justify-content-center">
        <div class="col-md-10 mb-5 mb-md-0">
          <h2 class="h3 mb-3 text-black font-heading-serif">프로필</h2>
          <h1>email:{{ $store.state.email }},id: {{ $store.state.id }},userId: {{userId}}</h1>
          <div class="p-3 p-lg-5 border">
            <div class="form-group">
              <label for="c_country" class="text-black">사용자 ID </label>
              <input type="text" class="form-control" :value="`${ this.userId }`" disabled>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <label for="c_fname" class="text-black">이메일</label>
                <input type="text" class="form-control" id="c_fname" name="c_fname" :value="`${ $store.state.email }`"
                  disabled>
              </div>
              <div class="col-md-12">
                <label for="c_lname" class="text-black">이메일 변경</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="c_code" placeholder="변경할 이메일 주소를 적어주세요"
                    aria-label="Coupon Code" aria-describedby="button-addon2" ref="email" v-model="email"
                    @keyup.enter="modifyEmail">
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-sm rounded px-4" type="button" id="button-addon2"
                      @click="modifyEmail">변경</button>
                  </div>
                </div>
              </div>
              <div class="col-md-12 alert alert-danger text-center" role="alert" v-if="errors" style="margin-top:1rem;">
                {{ message }}
              </div>
            </div>

            <!-- <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_companyname" class="text-black"> </label>
                  <input type="text" class="form-control" id="c_companyname" name="c_companyname">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_address" class="text-black">Address <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_address" name="c_address" placeholder="Street address">
                </div>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" placeholder="Apartment, suite, unit etc. (optional)">
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_state_country" class="text-black">State / Country <span
                      class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_state_country" name="c_state_country">
                </div>
                <div class="col-md-6">
                  <label for="c_postal_zip" class="text-black">Posta / Zip <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_postal_zip" name="c_postal_zip">
                </div>
              </div>

              <div class="form-group row mb-5">
                <div class="col-md-6">
                  <label for="c_email_address" class="text-black">Email Address <span
                      class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_email_address" name="c_email_address">
                </div>
                <div class="col-md-6">
                  <label for="c_phone" class="text-black">Phone <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_phone" name="c_phone" placeholder="Phone Number">
                </div>
              </div>

              <div class="form-group">
                <label for="c_create_account" class="text-black" data-toggle="collapse" href="#create_an_account"
                  role="button" aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" value="1"
                    id="c_create_account"> Create an account?</label>
                <div class="collapse" id="create_an_account">
                  <div class="py-2">
                    <p class="mb-3">Create an account by entering the information below. If you are a returning customer
                      please login at the top of the page.</p>
                    <div class="form-group">
                      <label for="c_account_password" class="text-black">Account Password</label>
                      <input type="email" class="form-control" id="c_account_password" name="c_account_password"
                        placeholder="">
                    </div>
                  </div>
                </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
import axios from 'axios'
import { mapState } from 'vuex'
  export default {
    name: 'profile',
    data() {
      return {
        errors: '',
        message: '',
        email: '',
        pwd: ''
      }
    },
    methods: {
      modifyEmail() {
        if (!this.email) {
          this.errors = true;
          this.message = '변경할 이메일 주소를 입력해주세요';
          this.$refs.email.focus();
          return null;
        } else {
          const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
          const validation = reg.test(this.email.replace(/(\s*)/g, ""));
          if (!validation) {
            this.errors = true;
            this.message = '이메일 형식을 확인해 주세요.';
            this.$refs.email.focus();
            return false;
          } else {
            this.errors = false;
            this.message = '';
          }
        }

        (async () => {
          try {
            const response = await this.$axios.patch(`${ this.url }/users/modify/${ this.userId }?type=e`, this.email);
            console.log(response);

            // 응답이 정상일 경우와 비정상일 경우(alert)
          } catch (err) {
            console.log(err);
          }
        })();
      },
      modifyPwd() {

      }
    },
    computed:{
      ...mapState(['id', 'userId', 'url'])
    }
  }
</script>