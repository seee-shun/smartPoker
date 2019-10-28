import page1 from './page1.vue'

var vm = new Vue({
    el: "#app2", // Vue.jsを使うタグのIDを指定
    data() {
        return {
            player: this.$store.state.player,
            maxRound: this.$store.state.maxRound,
            chip: this.$store.state.chip,
            minBet: this.$store.state.minBet,
            array: [],
            round: 1,
            dealer: '',
            pot: 0,
            bettingRound: ['プリフロップ', 'フロップ', 'ターン', 'リバー', '結果'],
            br: 0,
            players: [],
            allBet: 0,
            order: '',
            turn: '',
            action: '',
            p: 3,
            selectActionValue: 2,
            selectActionOptions: {
                1: 'ベット',
                2: 'コール',
                3: 'レイズ',
                4: 'チェック',
                5: 'フォールド',
                6: 'オールイン'
            },
            selectWinnerValue: '',
            pay: 10,
            playing: 0,
            comment: '',
            winComment: '',
            checkCount: 0,
        };
    },
    components: {
    },
    created() {
        //プレイヤー設定
        for (let i = 0; i < this.player; i++) {
            let j = 'P' + (i + 1);
            let addPlayer = { 'name': j, 'chip': this.chip, 'bet': 0, 'isfold': 0 }
            this.players.push(addPlayer)
        }
        //席順
        for (let i = this.players.length - 1; i >= 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[rand]] = [this.players[rand], this.players[i]]
        }
        //席順の出力
        let q = 0
        for (let item in this.players) {
            this.order = this.order + this.players[item]['name'] + ',';
            q++;
            if (q == this.players.length) {
                console.log(this.order + 'の順です。');
            }
        }

        console.log(this.bettingRound[0]);
        //ディーラーを決定
        this.dealer = this.players[0].name;
        console.log('ディーラー:' + this.dealer);
        this.playing = this.players.length;

        //ssbsのベット
        this.sbbb();
        //utgのターン
        this.turn = this.players[3].name;
        console.log(this.players[3].name + 'の番です');
    },
    conputed: {
    },
    methods: {
        submit: function () {
            if (this.pay < this.players[this.p % this.players.length].chip && this.pay >= this.minBet) {
                if (this.action != 'チェック') {
                    this.checkCount = 0;
                }
                this.winComment = '';
                //アクション
                this.action = this.selectActionOptions[this.selectActionValue];
                switch (this.action) {
                    case 'ベット': this.betting(); break;
                    case 'コール': this.call(); break;
                    case 'レイズ': this.raise(); break;
                    case 'チェック': this.check(); break;
                    case 'フォールド': this.fold(); break;
                    case 'オールイン': this.allIn(); break;
                }
            } else {
                this.comment = '所持しているチップ数を超えています'
            }

        },
        betting() {
            console.log('ベット');
            let isBet = false;
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].bet != 0) {
                    isBet = true;
                }
            }
            if (isBet === false) {
                this.players[this.p % this.players.length].bet = this.pay;
                this.players[this.p % this.players.length].chip = this.players[this.p % this.players.length].chip - this.players[this.p % this.players.length].bet;
                console.log('ベット額:' + this.players[this.p % this.players.length].bet);
                console.log('チップ:' + this.players[this.p % this.players.length].chip);
                this.nextTurn();
            } else {
                this.comment = '既にベットされています';
            }
        },
        call() {
            console.log('コール');
            if (this.players[this.p % this.players.length].bet < Math.max.apply(null, this.players.map(function (o) { return o.bet; }))) {
                this.pay = Math.max.apply(null, this.players.map(function (o) { return o.bet; }));
                let pay2 = this.pay - this.players[this.p % this.players.length].bet;
                this.players[this.p % this.players.length].bet = this.pay;
                this.players[this.p % this.players.length].chip = this.players[this.p % this.players.length].chip - pay2;
                console.log('ベット額:' + this.players[this.p % this.players.length].bet);
                console.log('チップ:' + this.players[this.p % this.players.length].chip);
                this.nextTurn();
            } else {
                this.comment = 'コールできません';
            }
        },
        raise() {
            console.log('レイズ');
            if (this.pay >= Math.max.apply(null, this.players.map(function (o) { return o.bet; })) * 2) {
                let pay2 = this.pay - this.players[this.p % this.players.length].bet;
                this.players[this.p % this.players.length].bet = this.pay;
                this.players[this.p % this.players.length].chip = this.players[this.p % this.players.length].chip - pay2;
                console.log('ベット額:' + this.players[this.p % this.players.length].bet);
                console.log('チップ:' + this.players[this.p % this.players.length].chip);
                this.nextTurn();
            } else {
                this.comment = 'ベットの2倍以上でレイズしてください';
            }
        },
        check() {
            console.log('チェック')
            if (this.players[this.p % this.players.length].bet == Math.max.apply(null, this.players.map(function (o) { return o.bet; }))) {
                this.checkCount++;
                console.log(this.checkCount);
                if (this.checkCount == this.playing) {
                    this.nextBr();
                } else {
                    this.nextTurn();
                }
            } else {
                this.comment = 'チェックできません';
            }
        },
        fold() {
            console.log('フォールド');
            this.players[this.p % this.players.length].isfold = 1;
            console.log(this.players[this.p % this.players.length].name + ":フォールド");
            this.playing = this.playing - 1;
            this.nextTurn();
        },
        allIn() {
            console.log('オールイン');
            this.players[this.p % this.players.length].bet = this.players[this.p % this.players.length].bet + this.players[this.p % this.players.length].chip;
            this.players[this.p % this.players.length].chip = 0;
            this.players[this.p % this.players.length].isfold = 1;
            console.log('ベット額:' + this.players[this.p % this.players.length].bet);
            console.log('チップ:' + this.players[this.p % this.players.length].chip);
            this.nextTurn();
        },
        winner() {
            if (this.selectWinnerValue != '') {
                this.selectWinnerValue = this.selectWinnerValue - 1;
                this.players[this.selectWinnerValue].chip = this.players[this.selectWinnerValue].chip + this.pot;
                this.winComment = this.players[this.selectWinnerValue].name + 'さんが勝ちました'
                this.selectWinnerValue = '';
                this.$modal.hide('winner-modal');
                this.nextRound();
            }
        },
        nextTurn() {
            this.comment = ''
            this.p++;
            //フォールドした人を飛ばす
            while (this.players[this.p % this.players.length].isfold == 1) {
                this.p++;
            }
            //全員フォールドしたとき
            if (this.playing == 1) {
                for (let i = 0; i < this.players.length; i++) {
                    this.allBet = Number(this.allBet) + Number(this.players[i].bet);
                    this.players[i].bet = 0;
                }
                this.pot = this.pot + Number(this.allBet);
                this.allBet = 0
                this.players[this.p % this.players.length].chip = this.players[this.p % this.players.length].chip + this.pot;
                this.winComment = this.players[this.p % this.players.length].name + 'さんが勝ちました'
                this.nextRound();
                //順番を回す
            } else {
                this.turn = this.players[this.p % this.players.length].name;
                console.log(this.turn + 'の番');
            }
        },
        nextBr() {
            if (this.br < 3) {
                //ベットをポットに移動
                for (let i = 0; i < this.players.length; i++) {
                    this.allBet = Number(this.allBet) + Number(this.players[i].bet);
                    this.players[i].bet = 0;
                }
                this.pot = this.pot + Number(this.allBet);
                this.allBet = 0
                this.checkCount = 0;
                //ベッティングラウンドを進める
                this.br = this.br + 1;
                console.log(this.bettingRound[this.br]);
                this.p = (this.round) % this.players.length
                while (this.players[this.p].isfold == 1) {
                    this.p++;
                }
                this.turn = this.players[this.p].name;
                console.log(this.turn + 'の番');
            } else {
                if (this.action != 'フォールド') {
                    this.show();
                }
            }
        },
        nextRound() {
            //次のラウンド・ディーラーを回す
            if (this.round < this.maxRound) {
                this.pot = 0;
                this.round += 1;
                this.br = 0
                this.playing = this.players.length;
                this.dealer = this.players[(this.round - 1) % this.players.length].name;
                for (let i = 0; i < this.players.length; i++) {
                    if (this.players[i].chip > 0) {
                        this.players[i].isfold = 0;
                    } else {
                        this.players[i].isfold = 1;
                    }
                }
                //コンソール出力
                console.log('ディーラー:' + this.dealer);
                console.log(this.bettingRound[0]);
                //SB.BBのベット
                this.sbbb();
            } else {
                this.players.chip.sort();
                let q = 0
                for (let item in this.players) {
                    this.order = this.order + this.players[item]['name'] + ',';
                    q++;
                    if (q == this.players.length) {
                        console.log(this.order + 'の順です。');
                    }
                }
                confirm('ゲーム終了');
                //結果のページに遷移

            }
        },
        sbbb() {
            /*while (this.players[(this.round)%this.players.length].isfold == 1){
              (this.round)%this.players.length =(this.round)%this.players.length +1;
            }*/
            this.players[(this.round) % this.players.length].bet = this.minBet / 2;
            this.players[(this.round) % this.players.length].chip = this.players[(this.round) % this.players.length].chip - this.players[(this.round) % this.players.length].bet;
            console.log(this.players[(this.round) % this.players.length].name + 'の番');
            console.log('ベット額:' + this.players[(this.round) % this.players.length].bet);
            console.log('チップ:' + this.players[(this.round) % this.players.length].chip);
            //bb
            /*while (this.players[(this.round +1)%this.players.length].isfold == 1){
              (this.round +1)%this.players.length =(this.round +1)%this.players.length +1;
            }*/
            this.players[(this.round + 1) % this.players.length].bet = this.minBet;
            this.players[(this.round + 1) % this.players.length].chip = this.players[(this.round + 1) % this.players.length].chip - this.players[(this.round + 1) % this.players.length].bet;
            console.log(this.players[(this.round + 1) % this.players.length].name + 'の番');
            console.log('ベット額:' + this.players[(this.round + 1) % this.players.length].bet);
            console.log('チップ:' + this.players[(this.round + 1) % this.players.length].chip);

        },
        show() {
            this.$modal.show('winner-modal');
        },
        /*sort(index){
                switch(index) {
                case 0:
                    this.sortItems.sort(function(a,b){
                        if(a.id < b.id) return -1;
                        if(a.id > b.id) return 1;
                        return 0;
                    });
                    break;
                case 1:
                    this.sortItems.sort(function(a,b){
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    });
                    break;
                case 2:
                    this.sortItems.sort(function(a,b){
                        if(a.age < b.age) return -1;
                        if(a.age > b.age) return 1;
                        return 0;
                    });
                    break;
                default:
                }
            }*/
    }
});
