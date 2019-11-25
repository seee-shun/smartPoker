var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
        // Vue.jsで使う変数はここに記述する

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
            if(vm.form > 1 && vm.form <= 7){
                vm.form--;
                console.log(vm.form);
                return vm.form;
            }
        },

        submit: function () {
            if (vm.mode == "login") {
                if (!vm.user.groupId) {
                    vm.err.group = 'グループIDを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                } else {
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
                    fetch(url + "/login", {
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
                            vm.err.group = 'そのグループIDは登録されていません';
                            exit;
                           
                        });
                }
            } else if (vm.mode == "signup") {
                if (!vm.user.groupId) {
                    vm.err.group = 'グループIDを入力してください';
                    // } else if(!vm.user.password) {
                    // vm.err = 'パスワードを入力してください';
                }else if(isNaN(vm.user.groupId)){
                    vm.err.group = "グループIDは数値で入力してください";
                }else if (!vm.user.user0 || !vm.user.user1) {
                    vm.err.username = '最低二人以上のユーザネームを入力してください';
                    exit;
                } 
                else {
                    // APIにPOSTリクエストを送る
                    let num = vm.user.groupId;
                    let target = Math.abs(num);
                    let checkLength = target.toString().length; 
                    if(checkLength > 3){
                        // localStorage.setItem('groupId', vm.user.groupId); 
                        console.log("4桁以上を確認しました");
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
                            console.log(vm.user.groupId);
                            
                            for(let m=0;m<json.records.length;m++){
                                if(json.records[m].groupId.value == vm.user.groupId){
                                    vm.err.group = "そのグループIDはすでに使われています";
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
                        let that = this;
                        fetch(url + "/signup", {
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
                                             
               
                                })
                                .catch(function (err) {
                                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                                    vm.err.username = "予期せぬエラーが発生しました";
                                });
                    }else{
                        vm.err.group = "グループIDは4桁以上で登録できます"
                        exit;
                    }
                        function sleep(waitMsec) {
                            var startMsec = new Date();
                        
                            // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
                            while (new Date() - startMsec < waitMsec);
                        }
          
                        sleep(2500);
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
                            console.log(vm.user.groupId);
                            for(let i=0;i<json.records.length;i++){
                                if(json.records[i].groupId.value == vm.user.groupId){
                                    vm.user.recordID = json.records[i].recordID.value;
                                }
                            }
                            localStorage.setItem("recordID",vm.user.recordID);
                            
                            location.href = "./index.html";
                            })
                            .catch(function(err) {
                            // レスポンスがエラーで返ってきたときの処理はここに記述する
                            
                            });
                
           

                }
            }
        }
    },

});
