var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
    records:[]
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        var log = function(){
        console.log("stay hungry.stay foolish");
        fetch(url + "/ranking", {
        method: "GET"
        })
        .then(function(response) {
            if (response.status == 200) {
                return response.json();
            }
            // 200番以外のレスポンスはエラーを投げる
            return response.json().then(function(json) {
                throw new Error(json.message);
            });
        })
        .then(function(json) {
        // レスポンスが200番で返ってきたときの処理はここに記述する
        console.log(json);
        
         vm.records = json.records;
         console.log(vm.records);
        })
        .catch(function(err) {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        });
    }
    setInterval(log,2000);
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
     
    },
});
