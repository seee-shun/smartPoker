webpackJsonp([1],{"0h5I":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("Xrl+"),s("fLmE");var i=s("7+uW"),n=s("EOUi"),h=s.n(n),l=s("rifk"),a=s.n(l),r=s("NYxO");i.a.use(r.a);var p=new r.a.Store({modules:{navigator:{strict:!0,namespaced:!0,state:{stack:[],player:"",maxRound:"",chip:"",minBet:"",ranking:[]},mutations:{push:function(t,e){t.stack.push(e)},pop:function(t){t.stack.length>1&&t.stack.pop()}}}}}),o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-ons-page",[s("div",[s("h1",[t._v(t._s(t.ranking[0].name)+"さんの勝利")]),t._v(" "),t._l(t.ranking,function(e,i){return s("ul",{key:i},[s("ol",[t._v(t._s(i+1)+"位:"+t._s(e.name))])])})],2)])},staticRenderFns:[]},c=s("VU/8")({data:function(){return{ranking:this.$store.state.ranking}},created:function(){}},o,!1,null,null,null).exports,u={data:function(){return{player:this.$store.state.player,maxRound:this.$store.state.maxRound,chip:this.$store.state.chip,minBet:this.$store.state.minBet,array:[],round:1,dealer:"",pot:0,bettingRound:["プリフロップ","フロップ","ターン","リバー"],br:0,players:[],allBet:0,order:"",turn:"",action:"",p:0,selectActionValue:2,selectActionOptions:{1:"ベット",2:"コール",3:"レイズ",4:"チェック",5:"フォールド",6:"オールイン"},selectWinnerValue:"",pay:10,playing:0,comment:"",winComment:"",checkCount:0,record:[]}},components:{},created:function(){this.fetch();for(var t=0;t<this.player;t++){var e={name:"P"+(t+1),chip:this.chip,bet:0,isplay:0};this.players.push(e)}for(var s=this.players.length-1;s>=0;s--){var i=Math.floor(Math.random()*(s+1)),n=[this.players[i],this.players[s]];this.players[s]=n[0],this.players[i]=n[1]}var h=0;for(var l in this.players)this.order=this.order+this.players[l].name+",",++h==this.players.length&&console.log(this.order+"の順です。");console.log(this.bettingRound[0]),this.dealer=this.players[0].name,console.log("ディーラー:"+this.dealer),this.playing=this.players.length,this.sbbb()},conputed:{},methods:{submit:function(){if(this.pay<this.players[this.p%this.players.length].chip)if(this.pay>=this.minBet)switch(this.winComment="",this.action=this.selectActionOptions[this.selectActionValue],this.action){case"ベット":this.betting();break;case"コール":this.call();break;case"レイズ":this.raise();break;case"チェック":this.check();break;case"フォールド":this.fold();break;case"オールイン":this.allIn()}else this.comment="最低ベット額は"+this.minBet+"です";else this.comment="所持しているチップ数を超えています"},betting:function(){console.log("ベット"),0==Math.max.apply(null,this.players.map(function(t){return t.bet}))?(this.checkCount=0,this.players[this.p%this.players.length].bet=this.pay,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip-this.players[this.p%this.players.length].bet,console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.nextTurn()):this.comment="既にベットされています"},call:function(){if(console.log("コール"),this.players[this.p%this.players.length].bet<Math.max.apply(null,this.players.map(function(t){return t.bet}))){this.checkCount=0,this.pay=Math.max.apply(null,this.players.map(function(t){return t.bet}));var t=this.pay-this.players[this.p%this.players.length].bet;this.players[this.p%this.players.length].bet=this.pay,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip-t,console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.nextTurn()}else this.comment="コールできません"},raise:function(){if(console.log("レイズ"),this.pay>=Math.max.apply(null,this.players.map(function(t){return t.bet}))){this.checkCount=0,this.pay=this.pay+Math.max.apply(null,this.players.map(function(t){return t.bet}));var t=this.pay-this.players[this.p%this.players.length].bet;this.players[this.p%this.players.length].bet=this.pay,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip-t,console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.nextTurn()}else this.comment="ベットの2倍以上でレイズしてください"},check:function(){console.log("チェック"),0==Math.max.apply(null,this.players.map(function(t){return t.bet}))?(this.checkCount++,this.checkCount==this.playing?(this.checkCount=0,this.nextBr()):this.nextTurn()):0==this.br&&this.p%this.players.length==(this.round+1)%this.players.length?this.nextBr():this.comment="既にベットされています"},fold:function(){console.log("フォールド"),this.players[this.p%this.players.length].isplay=1,console.log(this.players[this.p%this.players.length].name+":フォールド"),this.playing--,this.nextTurn()},allIn:function(){console.log("オールイン"),this.players[this.p%this.players.length].chip+this.players[this.p%this.players.length].bet>=Math.max.apply(null,this.players.map(function(t){return t.bet}))?(this.checkCount=0,this.players[this.p%this.players.length].bet=this.players[this.p%this.players.length].bet+this.players[this.p%this.players.length].chip,this.players[this.p%this.players.length].chip=0,this.players[this.p%this.players.length].isplay=2,this.playing--,console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.nextTurn()):this.comment="チップが足りません"},winner:function(){""!=this.selectWinnerValue&&(this.selectWinnerValue=this.selectWinnerValue-1,this.players[this.selectWinnerValue].chip=this.players[this.selectWinnerValue].chip+this.pot,this.winComment=this.players[this.selectWinnerValue].name+"さんが勝ちました",this.selectWinnerValue="",this.$modal.hide("winner-modal"),this.nextRound())},nextTurn:function(){this.comment="";for(var t=0,e=0;e<this.players.length;e++)this.players[this.p%this.players.length].bet==this.players[e].bet&&t++;if(console.log(this.p+"."+this.players.length),t!=this.playing||0==Math.max.apply(null,this.players.map(function(t){return t.bet}))||0==this.br&&this.p==this.players.length+1){for(this.p++;0!=this.players[this.p%this.players.length].isplay&&(this.p++,this.p!=this.maxRound+this.players.length););if(1==this.playing)if(1==Math.max.apply(null,this.players.map(function(t){return t.isplay}))){for(var s=0;s<this.players.length;s++)this.allBet=Number(this.allBet)+Number(this.players[s].bet),this.players[s].bet=0;this.pot=this.pot+Number(this.allBet),this.allBet=0,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip+this.pot,this.winComment=this.players[this.p%this.players.length].name+"さんが勝ちました",this.nextRound()}else this.turn=this.players[this.p%this.players.length].name,console.log(this.turn+"の番");else if(0==this.playing){for(var i=0;i<this.players.length;i++)this.allBet=Number(this.allBet)+Number(this.players[i].bet),this.players[i].bet=0;this.pot=this.pot+Number(this.allBet),this.allBet=0,this.show()}else this.turn=this.players[this.p%this.players.length].name,console.log(this.turn+"の番")}else this.nextBr()},nextBr:function(){for(var t=0;t<this.players.length;t++)this.allBet=Number(this.allBet)+Number(this.players[t].bet),this.players[t].bet=0;if(this.pot=this.pot+Number(this.allBet),this.allBet=0,this.br<3){for(this.br=this.br+1,console.log(this.bettingRound[this.br]),this.p=this.round%this.players.length;0!=this.players[this.p].isplay&&(this.p++,this.p!=this.maxRound+this.players.length););this.turn=this.players[this.p%this.players.length].name,console.log(this.turn+"の番")}else"フォールド"!=this.action&&this.show()},nextRound:function(){if(this.round<this.maxRound){this.round+=1,this.pot=0,this.br=0,this.playing=this.players.length;for(var t=0;t<this.players.length;t++)this.players[t].chip>0?this.players[t].isplay=0:(this.players[t].isplay=1,this.playing--),1==this.playing&&(this.sort(),this.$store.commit("navigator/push",c));for(this.p=(this.round-1)%this.players.length;1==this.players[this.p%this.players.length].isplay;)this.p++;this.dealer=this.players[this.p%this.players.length].name,console.log("ディーラー:"+this.dealer),console.log(this.bettingRound[0]),this.sbbb()}else this.sort(),this.$store.commit("navigator/push",c)},sbbb:function(){for(this.p=this.round%this.players.length;0!=this.players[this.p%this.players.length].isplay;)this.p++;for(this.players[this.p%this.players.length].bet=this.minBet/2,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip-this.players[this.p%this.players.length].bet,console.log(this.players[this.p%this.players.length].name+"の番"),console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.p++;0!=this.players[this.p%this.players.length].isplay;)this.p++;for(this.players[this.p%this.players.length].bet=this.minBet,this.players[this.p%this.players.length].chip=this.players[this.p%this.players.length].chip-this.players[this.p%this.players.length].bet,console.log(this.players[this.p%this.players.length].name+"の番"),console.log("ベット額:"+this.players[this.p%this.players.length].bet),console.log("チップ:"+this.players[this.p%this.players.length].chip),this.p++;0!=this.players[this.p%this.players.length].isplay;)this.p++;this.turn=this.players[this.p%this.players.length].name,console.log(this.players[this.p%this.players.length].name+"の番")},show:function(){this.$modal.show("winner-modal")},sort:function(){console.log(this.players),this.players.sort(function(t,e){return t.chip>e.chip?-1:t.chip<e.chip?1:0}),this.$store.state.ranking=this.players},fetch:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){fetch(this.$url+"/ranking",{method:"GET"}).then(function(t){return 200==t.status?t.json():t.json().then(function(t){throw new Error(t.message)})}).then(function(t){console.log(t),this.records=t.records,console.log(this.records)}).catch(function(t){})})}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-ons-page",[s("h2",[t._v("\n    ラウンド"+t._s(t.round)+"\n    "),s("br"),t._v("\n    "+t._s(t.bettingRound[t.br])+"\n    "),s("br"),t._v("\n    "+t._s(t.winComment)+"\n  ")]),t._v(" "),s("div",[t._v(t._s(t.order)+" の順です。")]),t._v(" "),s("div",[t._v("ディーラーは"+t._s(t.dealer)+"です。")]),t._v(" "),s("div",[t._v(t._s(t.turn)+"の番です。")]),t._v(" "),s("div",[s("form",{on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectActionValue,expression:"selectActionValue"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectActionValue=e.target.multiple?s:s[0]}}},t._l(t.selectActionOptions,function(e,i){return s("option",{domProps:{value:i}},[t._v(t._s(e))])}),0),t._v(" "),s("br"),t._v(" "),s("label",{attrs:{for:"bet"}},[t._v("ベット額")]),t._v(" "),s("br"),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.pay,expression:"pay"}],attrs:{type:"number"},domProps:{value:t.pay},on:{input:function(e){e.target.composing||(t.pay=e.target.value)}}}),t._v(" "),s("div",[s("button",{attrs:{type:"submit"}},[t._v("アクション")]),t._v(" "),s("br"),t._v("\n        "+t._s(this.comment)+"\n      ")])])]),t._v(" "),s("br"),t._v(" "),s("modal",{attrs:{name:"winner-modal"}},[s("div",{staticStyle:{"margin-left":"100px"}},[s("h2",[t._v("ショーダウン")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectWinnerValue,expression:"selectWinnerValue"}],on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectWinnerValue=e.target.multiple?s:s[0]}}},t._l(t.players,function(e,i){return s("option",{domProps:{value:i+1}},[t._v(t._s(e.name))])}),0),t._v("\n      の勝ち\n      "),s("br"),t._v(" "),s("br"),t._v(" "),s("v-ons-button",{on:{click:t.winner}},[t._v("次のラウンドへ")])],1)]),t._v(" "),s("br"),t._v(" "),s("div",[t._v("ポット"+t._s(t.pot))]),t._v(" "),t._l(t.players,function(e){return s("ul",{key:t.players.name,staticStyle:{float:"left"}},[s("li",[t._v(t._s(e.name)+"/"+t._s(e.isplay))]),t._v(" "),s("li",[t._v("ベット : "+t._s(e.bet))]),t._v(" "),s("i",[t._v("チップ: "+t._s(e.chip))])])})],2)},staticRenderFns:[]};var m=s("VU/8")(u,y,!1,function(t){s("k97p")},"data-v-3bdf3742",null).exports,g={data:function(){return{player:4,maxRound:4,chip:300,minBet:10,players:[],records:[]}},created:function(){this.fetch()},methods:{submit:function(){this.$store.state.player=Number(this.player),this.$store.state.maxRound=Number(this.maxRound),this.$store.state.chip=Number(this.chip),this.$store.state.minBet=Number(this.minBet),this.$store.commit("navigator/push",m)},fetch:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=this;console.log(this.$url),fetch(this.$url+"/ranking",{method:"GET"}).then(function(t){return 200==t.status?t.json():t.json().then(function(t){throw new Error(t.message)})}).then(function(e){console.log(e),t.records=e.records,console.log(t.records)}).catch(function(t){})})}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-ons-page",[s("h1",[t._v("Smart Poker")]),t._v(" "),s("p",[t._v("これからテキサスホールデムを始めます。ベットするチャンスは4回以上、その都度、賭け金も上がる激熱な展開が待っています。ゲームを続けるか、降りるか、選択はあなた次第です。最終的には、決められたラウンド数で一番多くチップを持っているあなたが勝者です。")]),t._v(" "),s("div",[s("h2",[t._v("ゲーム設定")]),t._v(" "),s("form",{on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[s("label",{attrs:{for:"player"}},[t._v("プレイヤー数")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.player,expression:"player"}],attrs:{type:"number"},domProps:{value:t.player},on:{input:function(e){e.target.composing||(t.player=e.target.value)}}})]),t._v(" "),s("label",{attrs:{for:"maxRound"}},[t._v("ラウンド")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.maxRound,expression:"maxRound"}],attrs:{type:"number"},domProps:{value:t.maxRound},on:{input:function(e){e.target.composing||(t.maxRound=e.target.value)}}})]),t._v(" "),s("label",{attrs:{for:"chip"}},[t._v("チップ")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.chip,expression:"chip"}],attrs:{type:"number"},domProps:{value:t.chip},on:{input:function(e){e.target.composing||(t.chip=e.target.value)}}})]),t._v(" "),s("label",{attrs:{for:"minbet"}},[t._v("最低ベット")]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.minBet,expression:"minBet"}],attrs:{type:"number"},domProps:{value:t.minBet},on:{input:function(e){e.target.composing||(t.minBet=e.target.value)}}})]),t._v(" "),s("div",[s("button",{attrs:{type:"submit"}},[t._v("ゲーム開始")])])])]),t._v(" "),s("div",[s("a",{attrs:{href:"./ranking.html"}})])])},staticRenderFns:[]};var f=s("VU/8")(g,v,!1,function(t){s("0h5I")},"data-v-00b37b93",null).exports,d={beforeCreate:function(){this.$store.commit("navigator/push",f)},data:function(){return{}},computed:{pageStack:function(){return this.$store.state.navigator.stack}}},b={render:function(){var t=this.$createElement;return(this._self._c||t)("v-ons-navigator",{attrs:{swipeable:"","swipe-target-width":"5%",id:"navigator","page-stack":this.pageStack,var:"navigator"}})},staticRenderFns:[]},_=s("VU/8")(d,b,!1,null,null,null).exports;i.a.config.productionTip=!1,i.a.prototype.$url="https://a1gf8dsmmf.execute-api.ap-northeast-1.amazonaws.com/dev",i.a.use(h.a),i.a.use(a.a),new i.a({el:"#app",store:p,template:"<App/>",components:{App:_}})},"Xrl+":function(t,e){},fLmE:function(t,e){},k97p:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.133944548a15e696b904.js.map