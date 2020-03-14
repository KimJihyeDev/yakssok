<template>
        <!-- products list start -->
        <div class="col-lg-3 mb-5 col-md-6">
            확인 {{ val.id }}
            클릭했던건지 확인: {{ liked }}
            <div class="wine_v_1 text-center pb-4">
                <router-link :to=" { name: 'detail', params: { id: val.id } }" class="thumbnail d-block mb-4"><img
                        :src="`${ path }/${ val.product_image }`" v-on:load="loaded" alt="Image"
                        class="img-fluid custom-img">
                    <div>
                        <h3 class="heading mb-1"><label class="text-black"
                                style="cursor:pointer;">{{ val.product_name }}</label></h3>
                    </div>
                </router-link>
                <!-- a태그는 글자깨짐 때문에 사용 금지 -->
                <!-- 컴포넌트로 분리할 경우 count를 부모가 참조해서 반복을 돌림 & more에도 사용 -->
                <!-- <div class="wine-actions"> -->
                <div>
                    확인:{{val.like}}
                    <h3 class="heading-2"><label class="pointer">{{ val.product_name }}</label></h3>
                    <span onclick="return false;" @click="like(val.id)">
                        <i class="far fa-thumbs-up pointer" :class="{ like: liked }" aria-hidden="true"></i>
                    </span>
                    <span class="price pointer ml-1" @click="like(val.id)">{{ val.like_count }}</span>
                    <span onclick="return false;" class="ml-3" @click="dislike(val.id)">
                        <i class="far fa-thumbs-down pointer" :class="{ dislike: disliked }" aria-hidden="true"></i>
                    </span>
                    <span class="price ml-1 pointer" @click="dislike(val.id)">{{ val.dislike_count }}</span>
                </div>
            </div>
        </div>
        <!-- products list end -->
</template>

<script>
import store from '@/store'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'Product',
    props: ['val', 'likeCount'],
    data() {
        return {
            liked: false,
            disliked: false,
        }
    },
    methods: {
          loaded(){
                this.isLoaded = true;
            },
            like(productId) {
                (async () => {
                    await store.dispatch('auth');
                    const id = store.getters.getId;
                    const socketId = store.getters.getSocketId;

                    if(!id) {
                        this.$router.push({ name: 'login' });
                        return false;
                    } 

                    if(id) {
                        // 상품 id도 줘야해..
                        this.$productSocket.emit('like', socketId, id, productId);
                        
                    }
                    // this.$productSocket.on('increase', (product) => {
                    //     console.log('증가발생', product);
                    // })
                    // console.log('id확인', id)
                })();
                
            },
            dislike() { 
                // productId매개변수로 지정
            },
    },
    created() {
        const id = store.getters.getId;
        // likeCount(사용자가 좋아요/싫어요한 상품들의 배열)에서 
        // 현재 상품의 id가 있는지 찾는다.
        if(this.likeCount) {
            this.likeCount.forEach(item => {
                if(item.productId == this.val.id)
                    item.like_dislike
                        ? this.liked = item.like_dislike
                        : this.disliked = item.like_dislike
            }); 
        }

        // userId와 내id가 같으면 클래스 변화시킨다
            // this.$productSocket.on('increase', (productId, like_count, userId) => {
            this.$productSocket.on('increase', (productId, like_count, userId) => {
                console.log('증가발생', productId, like_count);
                // 현재 상품 배열에서 해당 상품의 id로 해당 상품을 찾아낸 후
                // 이벤트가 발생하면 메소드를 실행시키자
                // 현재 배열에서 객체들의 key 중 id를 구해낸다
                // 그 중에서 해당 상품의 id를 찾는다.
                // 또는 이벤트를 실행
                // this.$emit('test', like_count);
                if(this.val.id == productId) this.val.like_count  = like_count;
                if(id === userId && productId === this.val.id) this.liked = true;
                console.log('장난해?',userId,this.selected );

            });

            // 이미 좋아요/싫어요를 한 상태에서 싫어요/좋아요를 한 경우
            this.$productSocket.on('exit', message => 
                alert(message)
            ); 

            // 좋아요 감소 이벤트
            this.$productSocket.on('decrease', (productId, like_count, userId) => {
                if(this.val.id === productId) this.val.like_count  = like_count;
                if(id === userId && productId === this.val.id) this.liked = false;
                console.log('확인!!!', id, userId, this.selected );
            }); 
    },
    computed: {
            ...mapState(['url']),
            ...mapGetters({ path: 'productImagePath' }),
    },
}
</script>

<style >
 /* 좋아요 선택시 색상 */
    .like {
       color: rgb(255, 71, 81);
    }
  /* 싫어요 선택시 생상 */
    .dislike {
        color: rgb(0, 130, 235);
    }
</style>