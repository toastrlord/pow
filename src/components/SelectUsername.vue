<template>
    <div>
        <input v-model="username" />
        <button @click="submitUsername">Submit!</button>
    </div>
</template>
<script>

export default {
    name: 'SelectUsername',
    data() {
        return {
            username: '',
        };
    },
    methods: {
        submitUsername() {
            this.$emit('input', this.username);
        },
    },
};
</script>
