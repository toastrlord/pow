<template>
    <div id='app'>
        <select-username
            @input='onUsernameSelection'
        />
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
