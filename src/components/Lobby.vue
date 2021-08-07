<template>
    <div>
        <user v-for='user in users' :key='user.userID' v-bind:name='user.username' v-bind:isReady='user.isReady'/>
        <message v-for='message in messages' :key='message.content' v-bind:sender='message.sender' v-bind:content='message.content'/>
        
        <input type='text' v-model='messageText'/>
        <button @click='sendMessage'>Send</button>
        <button @click='readyUp'>Ready</button>
    </div>
</template>

<script>
import socket from '../socket';
import Vue from 'vue';
import User from './User.vue';
import Message from './Message.vue';

export default {
    name: 'Lobby',
    components: {
        User,
        Message
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
            const index = this.users.findIndex(u => u.userID === user.userID);
            const updatedUser = this.users[index];
            updatedUser.isReady = true;
            Vue.set(this.users, index, updatedUser);
        });

        socket.on('new message', message => {
            this.messages.push(message);
        });
    },
    methods: {
        sendMessage() {
            const message = { 
                content: this.messageText, 
                sender: socket.auth.username 
            };
            socket.emit('new message', message);
            //this.messages.push(message)
            this.messageText = '';
        },
        readyUp() {
            socket.emit('user ready', { 
                userID: socket.id,
            });
        }
    }
}
</script>