exports.getDeployFile = function (filename) {
    filename = filename.replace(/.js/, '');
    return {
        region: 'ap-northeast-1',
        handler: filename + '.handler',
        role: 'arn:aws:iam::501925939222:role/lambda-role',
        functionName: filename,
        timeout: 10,
        runtime: 'nodejs10.x'
    };
};
  