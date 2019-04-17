// 解构导出

exports.setError = function(err,res,db){
    if(err){
        throw err;
        res.json({
            err,
            code:500,
            msg:"数据库错误 —— 无效的服务"
        })
        db.close();
    }

}

exports.dateFormat = function(){

}

exports.checkLogin = function(){

}