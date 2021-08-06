<template>
    <div>
        <p v-for='user in users' :key='user.username'>
            {{ user.username }}
        </p>
        <p v-for='message in messages' :key='message.content'>
            {{ message.content }}
        </p>
        <input type='text' v-model='messageText'/>
        <button @click='sendMessage'>Send</button>
    </div>
</template>

<script>
import socket from '../socket';

export default {
    name: 'Lobby',
    data() {
        return {
            users: [],
            messages: [],
            messageText: '',
        };
    },
    created() {
        socket.on('users', (users) => {
            console.log('updating users');
            this.users = users;
        });

        socket.on('user connected', user => {
            this.users.push(user);
        });
    },
    methods: {
        sendMessage() {
            
            this.messageText = '';
        },
    }
}
</script>