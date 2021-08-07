<template>
    <div>
        <p>{{ sender }}: {{ content }}</p>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: ['sender', 'content'],
}
</script>
