<template>
    <div id='app'>
        <p>Hello World!</p>
        <input type='text' id='usernameInput'></input>
        <button>Connect!</button>
    </div>
</template>

<script>
import SelectUsername from './components/SelectUsername.vue';
import socket from './socket';

export default {
    name: 'App',
    components: {
        SelectUsername,
    },
    data() {
        return {}
    },
    methods: {
        onUsernameSelection(username) {
            socket.connect();
        }
    }
}
</script>
