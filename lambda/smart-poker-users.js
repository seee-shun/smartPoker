var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "user";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    //TODO: 取得したいテーブル名をparamオブジェクトに設定する（中身を記述）
    var param = {
    };

    //dynamo.scan()で全件取得
    dynamo.scan(param, function(err, data){
        if(err){
            //TODO: //データの取得に失敗

        }

        //TODO: 全ユーザのpasswordを隠蔽する処理を記述

        //TODO: レスポンスボディの設定とコールバックの記述
        
    });
};
