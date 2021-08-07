<template>
    <div>
        <p>{{ name }}</p>
        <p v-if='isReady'>Ready</p>
        <p v-else>Not Ready</p>
    </div>
</template>

<script>

export default {
    name: 'User',
    props: ['name', 'isReady'],
}
</script>
