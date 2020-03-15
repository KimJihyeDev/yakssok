<template>
    <div class="col-lg-3 mb-5 col-md-6">
        <div class="wine_v_1 text-center pb-4">
            <router-link :to=" { name: 'detail', params: { id: val.id } }" class="thumbnail d-block mb-4"><img
                    :src="`${ path }/${ val.product_image }`" v-on:load="loaded" alt="Image"
                    class="img-fluid custom-img">
            <div>
                <h3 class="heading mb-1">
                <label class="text-black pointer">{{ val.product_name }}</label></h3>
            </div>
            </router-link>
            <!-- a태그는 글자깨짐 때문에 사용 금지 -->
            <div class="wine-actions">
                <div>
                    확인:{{val.like}}
                    <h3 class="heading-2"><label class="pointer">{{ val.product_name }}</label></h3>
                    <span onclick="return false;" @click="like(val.id)">
                        <i class="far fa-thumbs-up pointer" :class="{ like: liked }" aria-hidden="true"></i>
                    </span>
                    <span class="h5 pointer ml-1" @click="like(val.id)">{{ val.like_count }}</span>
                    <span onclick="return false;" class="ml-3" @click="dislike(val.id)">
                        <i class="far fa-thumbs-down pointer" :class="{ dislike: disliked }" aria-hidden="true"></i>
                    </span>
                    <span class="h5 ml-1 pointer" @click="dislike(val.id)">{{ val.dislike_count }}</span>
                </div>
            </div>
        </div>
    </div>
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
                        console.log( socketId, id, productId)
                        this.disliked
                            ? alert('이미 좋아요/싫어요를 하셨습니다.')
                            : this.$productSocket.emit('like', socketId, id, productId)
                    }
                })();
                
            },
            dislike(productId) { 
                (async () => {
                    await store.dispatch('auth');
                    const id = store.getters.getId;
                    const socketId = store.getters.getSocketId;

                    if(!id) {
                        this.$router.push({ name: 'login' });
                        return false;
                    } 

                    if(id) {
                        this.liked
                            ? alert('이미 좋아요/싫어요를 하셨습니다.')
                            : this.$productSocket.emit('dislike', socketId, id, productId)
                    }
                })();
                
            },
    },
    created() {
        const id = store.getters.getId;

        if(this.likeCount) {
            this.likeCount.forEach(item => {
                if(item.productId == this.val.id)
                    item.like_dislike
                        ? this.liked = true
                        : this.disliked = true
            }); 
        }

        // 좋아요 증가 이벤트
        // userId와 내id가 같으면 클래스를 변화시킨다
        this.$productSocket.on('likeIncrease', (productId, like_count, userId) => {
            if(this.val.id == productId) this.val.like_count  = like_count;
            if(id === userId && productId === this.val.id) this.liked = true;
        });

        // 좋아요 감소 이벤트
        this.$productSocket.on('likeDecrease', (productId, like_count, userId) => {
            if(this.val.id === productId) this.val.like_count  = like_count;
            if(id === userId && productId === this.val.id) this.liked = false;
        }); 

        // 싫어요 증가 이벤트
        this.$productSocket.on('dislikeIncrease', (productId, dislike_count, userId) => {
            console.log('싫어요증가발생', productId, dislike_count);
            if(this.val.id == productId) this.val.dislike_count  = dislike_count;
            if(id === userId && productId === this.val.id) this.disliked = true;
        });

        // 싫어요 감소 이벤트
        this.$productSocket.on('dislikeDecrease', (productId, dislike_count, userId) => {
            if(this.val.id === productId) this.val.dislike_count  = dislike_count;
            if(id === userId && productId === this.val.id) this.disliked = false;
            console.log('확인!!!', id, userId, this.selected );
        });
    },
    computed: {
            ...mapState(['url']),
            ...mapGetters({ path: 'productImagePath' }),
    },
    destroyed() {
        console.log('뷰객체 파괴')
    }
}
</script>

<style >
/* a태그 처리 */
    .pointer {
    cursor: pointer;
    }
 /* 좋아요 선택시 색상 */
    .like {
       color: rgb(255, 71, 81);
    }
  /* 싫어요 선택시 생상 */
    .dislike {
        color: rgb(0, 130, 235);
    }
</style>