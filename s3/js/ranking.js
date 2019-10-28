var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
        submit:function(){

            const request = require('request');
        
            let params = {
                url: 'https://devepinrz.cybozu.com/k/v1/records.json?app=3',
                method: 'GET',
                json: true,
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    'X-Cybozu-API-Token': 'zlS3MJ4zoz82Wwc8glfnXKFpe6RlwXIKbAO6gyAx'
        
                },
            };
        
            request(params, function(err, resp, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(body);
            });
        }
    },
});
