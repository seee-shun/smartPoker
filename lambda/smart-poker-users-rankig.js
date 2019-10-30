var kintone = require('kintone-nodejs-sdk');
var APP_ID = 3; // schedule app id
var DOMAIN = 'devepinrz.cybozu.com'; // your domain
var API_TOKEN = 'zlS3MJ4zoz82Wwc8glfnXKFpe6RlwXIKbAO6gyAx'; // API TOKEN
var kintoneAuth = new kintone.Auth();
kintoneAuth.setApiToken(API_TOKEN);
var kintoneConnection = new kintone.Connection(DOMAIN, kintoneAuth);
var kintoneRecord = new kintone.Record(kintoneConnection);
exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    //TODO: 取得したいfieldcodeオブジェクトに設定する（中身を記述）
    var updateKey =  { // Optional. Required, if id will not be specified.
        'field': 'personalId',
        'value': personalid
    };
    
    var recordData = {
        'point':{
            'value': totalpoint
        }
    };
    //dynamo.scan()で全件取得
    kintoneRecord.updateRecordByUpdateKey(APP_ID,updateKey,recordData).then(function(resp){
        response.body = JSON.stringify(resp);
        callback(null,response);
        return;
            
            
        }).catch(function(err){
            response.statusCode = 500;
            response.body = JSON.stringify({
               "message": "予期せぬエラーが発生しました"
               
        });
        callback(null,response);
        return;
        //TODO: 全ユーザのpasswordを隠蔽する処理を記述

        //TODO: レスポンスボディの設定とコールバックの記述
        // kun
        })
};

