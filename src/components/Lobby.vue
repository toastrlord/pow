<template>
    <div>
        <user v-for='user in users' :key='user.userID' v-bind:name='user.username' v-bind:isReady='user.isReady'/>
        <p v-for='message in messages' :key='message.content'>
            {{ message.content }}
        </p>
        
        <input type='text' v-model='messageText'/>
        <button @click='sendMessage'>Send</button>
        <button @click='readyUp'>Ready</button>
    </div>
</template>

<script>
import socket from '../socket';
import User from './User.vue';

export default {
    name: 'Lobby',
    components: {
        User
    },
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

        socket.on('user ready', user => {
            const readyUser = this.users[this.users.findIndex(u => u.userID = user.userID)];
            console.log(readyUser);
            readyUser.isReady = true;
        });

        socket.on('new message', message => {
            this.messages.push(message);
        });
    },
    methods: {
        sendMessage() {
            socket.emit('new message', { 
                content: this.messageText, 
                sender: socket.auth.username 
            });
            this.messageText = '';
        },
        readyUp() {
            socket.emit('user ready', { 
                userID: socket.id,
                isReady: true,
            });
        }
    }
}
</script>