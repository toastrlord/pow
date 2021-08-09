<template>
    <div>
        <p v-for='player in players' :key='player.name'>
            {{ player.name }}
        </p>
        <card v-for='card in cards' :key='card.name' v-bind:card='card'/>
    </div>
</template>

<script>
import Card from './Card.vue';
import socket from '../socket';

    export default {
        name: 'Game',
        components: [
            Card,
        ],
        data() {
            return {
                cards: [],
            };
        },
        created() {
            socket.on('draw cards', newCards => {
                cards.push(newCards);
            });
        },
    }
</script>