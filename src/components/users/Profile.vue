<template>
    <div style="margin-top:100px;">
        1ㅇㅇㅇ
    </div>
</template>

<script>
export default {
    name: 'profile',
    data(){
        return {
            test: ''
        }
    },
    created(){
        const token = localStorage.getItem('YAKSSOK-TOKEN');
         (async () => {
      try{
        // alert('토큰있음')  
          console.log('토큰확인요청보냄')                                  
          const result = await this.$axios.post(`${ this.$store.state.url }/users/profile`, this.test, { headers: { authorization: token }});
          console.log('내가 보내 토큰');
          console.log(token);
          console.log(result);
          // result.data.code === 401 || result.data.code === 419
          //   ? console.log('토큰 만료')
          //   : console.log('토큰 유효')
            if(result.data.code === 401){ console.log('토큰만료')}
            if(result.data.code === 419){ console.log('유효x')}
        //   next();
      }catch(err){
           console.log(err);
      }
  })();
    }
}
</script>