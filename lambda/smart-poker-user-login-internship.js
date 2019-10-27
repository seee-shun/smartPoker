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

    var body = JSON.parse(event.body);

    var userId = body.userId;
    var password = body.password;

    //TODO: query()に渡すparamを宣言
    var param = {
        "TableName" : ,
        //キー、インデックスによる検索の定義
        "KeyConditionExpression" :
            "",
        //プライマリーキー以外の属性でのフィルタ
        "FilterExpression":
            "",
        //属性名のプレースホルダの定義
        "ExpressionAttributeNames" : {
        },
        //検索値のプレースホルダの定義
        "ExpressionAttributeValues" : {
        }
    };

    //dynamo.query()を用いてuserIdとpasswordが一致するデータの検索
    dynamo.query(param, function(err, data){
        //userの取得に失敗
        if(err){
            response.statusCode = 500;
            response.body = JSON.stringify({"message" : "予期せぬエラーが発生しました"});
            callback(null, response);
            return;
        }
        //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：data.Itemsの中身が空)

        //TODO: 認証が成功した場合のレスポンスボディとコールバックを記述

    });
};
