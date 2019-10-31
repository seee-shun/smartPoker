var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        mode: "login",
        submitText: "ログイン",
        toggleText: "新規登録",
        user: {
            groupId: null,
            // password: null,
            userId  : [],
        },
        err: null
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
        toggleMode: function() {
            if (vm.mode == "login") {
                vm.mode = "signup";
                vm.submitText = "新規登録";
                vm.toggleText = "ログイン";
            } else if (vm.mode == "signup") {
                vm.mode = "login";
                vm.submitText = "ログイン";
                vm.toggleText = "新規登録";
            }
        },

        submit: function() {
            if (vm.mode == "login") {
                if (!vm.user.groupId) {
                    vm.err = 'groupIdを入力してください';
                // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else {
                // ログイン処理はここに
                    fetch(url + "/login", {
                        method: "POST",
                        body: JSON.stringify({
                            "groupId": vm.user.groupId,
                            // "password": vm.user.password
                        })
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
                            // localStorage.setItem('token', json.token);
                            localStorage.setItem('groupId', vm.user.groupId);
                            location.href = "./ranking.html";
                        })
                        .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                            vm.err = '予期せぬエラーが発生しました';
                        });


                }
            } else if (vm.mode == "signup") {
                if (!vm.user.groupId) {
                    vm.err = 'groupIdを入力してください';
                // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else if (!vm.user.userId) {
                    vm.err = 'userIdを入力してください';
                } 
                else {
                // APIにPOSTリクエストを送る
                    fetch(url + "/signup", {
                        method: "POST",
                        body: JSON.stringify({
                            "groupId": vm.user.groupId,
                            // "password": vm.user.password,
                            "userNames": vm.user.userId,
                        })
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
                            // localStorage.setItem('token', json.token);
                            localStorage.setItem('groupId', vm.user.groupId);
                            localStorage.setItem('userId', vm.user.userId);
                            location.href = "./ranking.html";
                        })
                        .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                        vm.err = "予期せぬエラーが発生しました";
                        });


                }
            }
        }
    },

});
