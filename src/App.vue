<template>
    <div id='app'>
        <select-username @input='onUsernameSelection' v-if='!signedIn'/>
        <game v-else-if="gameStarted" />
        <lobby v-else />
    </div>
</template>

<script>
import SelectUsername from './components/SelectUsername.vue';
import Lobby from './components/Lobby.vue';
import User from './components/User.vue';
import socket from './socket';

export default {
    name: 'App',
    components: {
        SelectUsername,
        Lobby,
    },
    data() {
        return {
            signedIn: false,
            gameStarted: false,
        }
    },
    created() {
        socket.on('game start', () => {
            this.gameStarted = true;
        });
    },
    methods: {
        onUsernameSelection(username) {
            this.signedIn = true;
            socket.auth = { username };
            socket.connect();
        }
    }
}
</script>
