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
            console.log(this.username);
            this.$emit('input', this.username);
        },
    },
};
</script>
