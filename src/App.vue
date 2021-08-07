<template>
    <div id='app'>
        <select-username @input='onUsernameSelection' v-if='!signedIn'/>
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
        }
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
