<template>
    <div style="margin-top: 200px;">
        <!-- <input type="text" v-model="message">메시지입력  -->
        <p>관리자님의</p>
        <p>메시지 &lt; {{ adminMessage }} &gt;입니다.</p>
        <div>
        내 메시지 

        </div>
        <input type="text" v-model="userMessage"> 내 메시지
        <button @click="sendMessage">채팅</button>

    </div>
</template>

<script>
export default {
    name: 'Chat',
    data(){
        return {
            message: '',
            id: '',
            userId: '1', // 사용자 id
            userMessage: '',
            adminMessage: '',
        }
    },
    created(){
        // 컴포넌트로 이동하자마자 chat에 접속(관리자와 연결)
        // this.$chatSocket.on('chat', (id, message) => {
        //     // 관리자의 메시지를 채팅창에 추가하기
        //     console.log(`관리자의 ${ id }, 메시지: ${ message }`);
        //     this.adminMessage = message;
        // })
        
        this.$chatSocket.on('welcome', (msg) => {
            console.log(msg);
        })

        this.$chatSocket.on('join', (message) => {
            console.log(message)
        })
        
    },
    methods:{
        
        sendMessage: function() {
            console.log('Client sending message: ',this.userId, this.userMessage);
            this.$chatSocket.emit('frontEndMessage', this.userId, this.userMessage);
        }
        // sendMessage: function() {
        // console.log('Client sending message: ',this.myid, this.mymessage);
        // this.$socket.emit('message',this.myid, this.mymessage);
        // }
    },
}
</script>