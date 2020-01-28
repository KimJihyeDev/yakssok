<template>
<!-- 나중에 스타일 전부 수정하기 -->
    <div style="margin:70px;">
        <div style="height:50px;">
            <p style="top:0px; margin:0px;"> categories  >  {{parent_cetegory}} > {{child_category}} </p>
        </div> 
    <div class="row" >
           
        <Product v-for="list in 12" v-bind:key="list" />
    </div>
    </div>
</template>

<script>
import Product from './Product.vue'
export default {
    name:'CategoryList',
    data:function(){
        return {
            parent_cetegory:'영양제',
            child_category:'비타민'
        }
    },
    components:{
        Product
    }
}
</script>
