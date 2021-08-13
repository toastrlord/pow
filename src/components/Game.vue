<template>
    <div>
        <div v-if='characterPicked'>
            <button v-for='character in characters' :key='character.name'>
                {{ character.name }}
            </button>
        </div>
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
                characters: [],
                characterPicked: false,
            };
        },
        methods() {

        },
        created() {
            socket.on('draw cards', newCards => {
                cards.push(newCards);
            });
            socket.on('pick character', character => {
                this.characterPicked = true;
            });
            socket.on('players', players => {
                this.players = players;
                this.characters = players.filter(player => player.username === socket.auth.username)[0].charactersToPick;
            });
        },
    }
</script>