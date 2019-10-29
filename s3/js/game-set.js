// import page2 from './game-play.js'
export default{
    el: "#app", // Vue.jsを使うタグのIDを指定
    data() {
        return {
            player: 4,
            maxRound: 4,
            chip: 300,
            minBet: 10,
            players: [],
        };
    },
    methods: {
        submit: function () {
            this.$store.state.player = Number(this.player);
            this.$store.state.maxRound = Number(this.maxRound);
            this.$store.state.chip = Number(this.chip);
            this.$store.state.minBet = Number(this.minBet);
            this.$store.commit("navigator/push", page2);
        }
    }
};
