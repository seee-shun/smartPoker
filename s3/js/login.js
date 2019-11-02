var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
        // Vue.jsで使う変数はここに記述する
        url: "https://a1gf8dsmmf.execute-api.ap-northeast-1.amazonaws.com/dev",

        mode: "login",
        submitText: "ログイン",
        toggleText: "新規登録",
        user: {
            groupId: null,
            recordID: null,
            users: [],
            user0: "",
            user1: "",
            user2: "",
            user3: "",
            user4: "",
            user5: "",
            user6: "",
            user7: ""
        },
        err: null
    },
    computed: {
        // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function () {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        toggleMode: function () {
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

        submit: function () {
            if (vm.mode == "login") {
                if (!vm.user.groupId) {
                    vm.err = 'groupIdを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else {
                    console.log(415);
                    let that = this;
                    // ログイン処理はここに
                    fetch(this.url + "/login", {
                        method: "POST",
                        // mode: 'cros',
                        body: JSON.stringify({
                            "groupId": that.user.groupId,
                            // "password": vm.user.password
                        })
                    })
                        .then(function (response) {
                            if (response.status == 200) {
                                console.log("aaa");
                                return response.json();
                                
                            }
                            // 200番以外のレスポンスはエラーを投げる
                            console.log("bbb");
                            return response.json().then(function (json) {
                                throw new Error(json.message);
                            });
                        })
                        .then(function (json) {
                            console.log(json);
                            // レスポンスが200番で返ってきたときの処理はここに記述する
                            // localStorage.setItem('token', json.token);
                            localStorage.setItem('groupId', vm.user.groupId);
                            console.log(vm.user.groupId);
                            
                            //  location.href = "./index.html";
                            console.log("ログイン成功")
                        })
                        .catch(function (err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            vm.err = 'そのgroupIdは登録していません';
                        });
                        fetch(this.url + "/ranking", {
                            method: "GET"
                            })
                            .then(function(response) {
                                console.log("ccc");
                                if (response.status == 200) {
                                    return response.json();
                                }
                                // 200番以外のレスポンスはエラーを投げる
                                console.log("ddd");
                                return response.json().then(function(json) {
                                    throw new Error(json.message);
                                });
                            })
                            .then(function(json) {
                            // レスポンスが200番で返ってきたときの処理はここに記述する
                            for(let i=0;i<json.records.length;i++){
                                if(json.records[i].groupId.value == vm.user.groupId){
                                    vm.user.recordID = json.records[i].recordID.value
                                }
                            }
                            localStorage.setItem("recordID",vm.user.recordID);
                            location.href = "./index.html";
                            })
                            .catch(function(err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            console.log("miss it");
                            });

                }
            } else if (vm.mode == "signup") {
                if (!vm.user.groupId) {
                    vm.err = 'groupIdを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else if (!vm.user.user0) {
                    vm.err = '最低一つ以上userIdを入力してください';
                }
                else {

                    for(var i=0; i<8; i++){
                        this.user.users.push(this.user["user"+i])
                    }

                    // APIにPOSTリクエストを送る
                    let that = this;
                    fetch(this.url + "/signup", {
                        method: "POST",
                        body: JSON.stringify({
                            "groupId": that.user.groupId,
                            // "password": vm.user.password,
                            "userNames": that.user.users,
                        })
                    })
                        .then(function (response) {
                            if (response.status == 200) {
                                return response.json();
                            }
                            // 200番以外のレスポンスはエラーを投げる
                            return response.json().then(function (json) {
                                throw new Error(json.message);
                            });
                        })
                        .then(function (json) {
                            // レスポンスが200番で返ってきたときの処理はここに記述する
                            // localStorage.setItem('token', json.token);
                            localStorage.setItem('groupId', vm.user.groupId);
                            // localStorage.setItem('userId', vm.user.users);
                            console.log("新規登録しました"+json)
                            console.log(json);
                            // location.href = "./index.html";
                        })
                        .catch(function (err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            vm.err = "予期せぬエラーが発生しました";
                        });
                        fetch(this.url + "/ranking", {
                            method: "GET"
                            })
                            .then(function(response) {
                                console.log("fff");
                                if (response.status == 200) {
                                    return response.json();
                                }
                                // 200番以外のレスポンスはエラーを投げる
                                console.log("ggg");
                                return response.json().then(function(json) {
                                    throw new Error(json.message);
                                });
                            })
                            .then(function(json) {
                            // レスポンスが200番で返ってきたときの処理はここに記述する
                            for(let i=0;i<json.records.length;i++){
                                if(json.records[i].groupId.value == vm.user.groupId){
                                    vm.user.recordID = json.records[i].recordID.value
                                }
                            }
                            localStorage.setItem("recordID",vm.user.recordID);
                            location.href = "./index.html";
                            })
                            .catch(function(err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            console.log("miss it");
                            });

                }
            }
        }
    },

});
