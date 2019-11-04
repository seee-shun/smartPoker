var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
        // Vue.jsで使う変数はここに記述する
        url: "https://a1gf8dsmmf.execute-api.ap-northeast-1.amazonaws.com/dev",

        mode: "login",
        submitText: "ログイン",
        toggleText: "新規登録",
        form:3,
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
        err: {          
            group:null,
            username:null
        }
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
        addInputArea: function(){
            console.log("yes");
            if(vm.form >= 0 && vm.form < 7){
                vm.form++;
                console.log(vm.form);
                return vm.form;
            }
        },
        deleteInputArea: function(){
            console.log("no");
            if(vm.form >= 1 && vm.form <= 7){
                vm.form--;
                console.log(vm.form);
                return vm.form;
            }
        },

        submit: function () {
            if (vm.mode == "login") {
                if (!vm.user.groupId) {
                    vm.err.group = 'groupIdを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else {
                    fetch(this.url + "/ranking", {
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
                        for(let i=0;i<json.records.length;i++){
                            if(json.records[i].groupId.value == vm.user.groupId){
                                vm.user.recordID = json.records[i].recordID.value
                            }
                        }
                        localStorage.setItem("recordID",vm.user.recordID);
                        })
                        .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                        console.log("miss it");
                        });
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
                                return response.json();
                                
                            }
                            // 200番以外のレスポンスはエラーを投げる
                            return response.json().then(function (json) {
                                throw new Error(json.message);
                            });
                        })
                        .then(function (json) {
                            console.log(json);
                            // レスポンスが200番で返ってきたときの処理はここに記述する
                            // localStorage.setItem('token', json.token);
                                console.log("ログイン成功")
                                location.href = "./index.html";
                        })
                        .catch(function (err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            vm.err.group = 'そのgroupIdは登録されていません';
                            exit;
                           
                        });
                }
            } else if (vm.mode == "signup") {
                if (!vm.user.groupId) {
                    vm.err.group = 'GroupIdを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                }else if(isNaN(vm.user.groupId)){
                    vm.err.group = "GroupIDは数値で入力してください";
                }else if (!vm.user.user0) {
                    vm.err.username = '最低一つ以上userIdを入力してください';
                } 
                else {
                    // APIにPOSTリクエストを送る
                    let num = vm.user.groupId;
                    let target = Math.abs(num);
                    let checkLength = target.toString().length; 
                    if(checkLength > 5){
                        // localStorage.setItem('groupId', vm.user.groupId); 
                        console.log("6桁以上を確認しました");
                    }else{
                        vm.err.group = "GroupIdは６桁以上で登録できます"
                        exit;
                    }
                    let that = this;
                    fetch(this.url + "/ranking", {
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
                        for(let i=0;i<json.records.length;i++){
                            if(json.records[i].groupId.value == vm.user.groupId){
                                vm.user.recordID = json.records[i].recordID.value
                            }
                        }
                        localStorage.setItem("recordID",vm.user.recordID);
                        for(let m=0;m<json.records.length;m++){
                            if(json.records[m].groupId.value == vm.user.groupId){
                                vm.err.group = "そのグループIDはすでに使われています"
                                exit;
                            }
                        }
                        })
                        .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                        
                        });
                        for(var i=0; i<8; i++){
                            this.user.users.push(this.user["user"+i])
                        }
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
                                    // localStorage.setItem('groupId', vm.user.groupId);
                                    console.log(json);
                                    location.href = "./index.html"
                                })
                                .catch(function (err) {
                                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                                    vm.err.username = "予期せぬエラーが発生しました";
                                });
                    
                }
            }
        }
    },

});
