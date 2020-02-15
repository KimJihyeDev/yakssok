<template>
    <div style="margin-top: 200px;">
        <p router to="/">이게 라우터라고?</p>
        <button @click="sendMessage('ㅏd','lll')">채팅</button>

    </div>
</template>

<script>
export default {
    name: 'Chat',
    created(){
    
        
    },
    methods:{
        
        sendMessage: function(nick,message) {
        console.log('Client sending message: ',nick, message);
        this.$socket.emit('message',nick, message);
    }
    }
}
</script>