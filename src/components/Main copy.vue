<template>
    <div class="container">
        <div class="site-section mt-5">
            <div class="container">
                <!-- carousel start -->
                <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <router-link :to="{ name: 'category', params: { parent_id: 1, child_id: 1 }}">
                                <img src="/assets/images/vitamins.png" class="d-block w-100" alt="...">
                            </router-link>
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>First slide label</h5> -->
                                <!-- <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> -->
                            </div>
                        </div>
                        <div class="carousel-item">
                            <router-link :to="{ name: 'category', params: { parent_id: 2, child_id: 1 }}">
                                <img src="/assets/images/pets.PNG" class="d-block w-100" alt="...">
                            </router-link>
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>Second slide label</h5> -->
                                <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> -->
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/notification.PNG" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <!-- <h5>Third slide label</h5> -->
                                <!-- <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> -->
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <!-- carousel end -->
                
                <div class="row">
                    <!-- products list start -->
                    <div class="col-lg-3 mb-5 col-md-6" v-for="(item,idx) in products"
                        :key="idx">
                        <div class="wine_v_1 text-center pb-4">
                            <router-link :to=" { name: 'detail', params: { id: item.id } }"
                                class="thumbnail d-block mb-4"><img :src="`${ path }/${ item.product_image }`"
                                    v-on:load="loaded"  alt="Image" class="img-fluid custom-img">
                            <div>
                                <h3 class="heading mb-1"><label class="text-black" style="cursor:pointer;">{{ item.product_name }}</label></h3>
                            </div>
                            </router-link>
                             <!-- a태그는 글자깨짐 때문에 사용 금지 -->
                             <!-- 컴포넌트로 분리할 경우 count를 부모가 참조해서 반복을 돌림 & more에도 사용 -->
                            <!-- <div class="wine-actions"> -->
                            <div>
                                <h3 class="heading-2"><label class="pointer">{{ item.product_name }}</label></h3>
                                <span onclick="return false;" @click="like(item.id)">
                                    <i class="far fa-thumbs-up pointer" aria-hidden="true"></i>
                                </span>
                                <span class="price pointer ml-1" @click="like(item.id)">{{ item.like_count }}</span>
                                <span onclick="return false;" class="ml-3" @click="dislike(item.id)">
                                    <i class="far fa-thumbs-down pointer" aria-hidden="true"></i>
                                </span>
                                <span class="price ml-1 pointer" @click="dislike(item.id)">{{ item.dislike_count }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- products list end -->
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="more" v-if="count > 12">더보기</button>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import store from '@/store'
import { mapState, mapGetters } from 'vuex'
    /*eslint no-unused-vars: "error"*/
    export default {
        name: 'Main',
        data: function () {
            return {
                users: [],
                products: [],
                isLoaded: false,
                rate: '',
                offSet: 0,
                count: 0,
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
            more() {
                (async () => {
                    const response = 
                        await this.$axios.get(`${ this.url }/products?offSet=${ this.offSet }`);
                    console.log(response.data);
                    const { code, message } = response.data;
                    // eslint-disable-next-line no-unused-vars
                    const { rows, count } = response.data.products;

                    if(code === 200) {
                        if (rows.length > 0) {
                            this.count = count;
                            rows.forEach(product => {
                            this.products.push(product)
                            });
                            this.offSet++;
                        } else if(rows.length < 1 && count != 0){
                            alert('마지막 페이지입니다.');
                            return false;
                        }
                    } else {
                        alert(message);
                    }
                })();
            }
        },
        created: function () {
            this.more();
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
                let keys = [];
                this.products.forEach((product, idx) => {
                    //  keys.push(Object.keys(product)
                    console.log(`반복${ idx }`, product.id);
                    keys.push(product.id);
                    // index를 알아내서 like를 증가시켜야 한다.
                });
                console.log('keys확인', keys);
                // arr.indexOf('idx')
                console.log(keys.indexOf(productId));
                const index = keys.indexOf(productId);
                console.log('ㅡㅡ', index);
                console.log('이거?', this.products[index]);
                this.products[index].like_count = like_count;

                // userId가 같을 경우 숫자 바뀌면서 클래스 바꿔서 색상 바꿔주기
                console.log(userId);

            });

            // 이미 좋아요/싫어요를 한 상태에서 싫어요/좋아요를 한 경우
            this.$productSocket.on('exit', message => 
                 alert(message)
            ); 

            // 좋아요 감소 이벤트
            this.$productSocket.on('decrease', (productId, like_count, userId) => {
                let keys = [];
                this.products.forEach((product, idx) => {
                    //  keys.push(Object.keys(product)
                    console.log(`반복${ idx }`, product.id);
                    keys.push(product.id);
                    // index를 알아내서 like를 증가시켜야 한다.
                });
                console.log('keys확인', keys);
                // arr.indexOf('idx')
                console.log(keys.indexOf(productId));
                const index = keys.indexOf(productId);
                console.log('ㅡㅡ', index);
                console.log('이거?', this.products[index]);
                this.products[index].like_count = like_count;

                console.log(userId);

            }); 

        },
        computed: {
            ...mapState(['url']),
            ...mapGetters({ path: 'productImagePath' }),
        },
        
    }
</script>
<style>
    .custom-img {
        padding: 20%;
    }

    /* carousel 사이즈 조절 */
    /* .carousel-item img {
        width: auto;
        height: 500px;
    } */

    /* 상품 리스트 이미지 조절 */
    .wine_v_1 img {
        width:auto;
        height:400px;
    }
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