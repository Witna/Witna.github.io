let {MongoClient}=require("mongodb");

const DB_URL = "mongodb://39.97.96.166:27017";
const DB_NAME = "i-music";
let dbObj = null;

module.exports = {
    conn(cb){
        MongoClient.connect(DB_URL,(err,client)=>{
            if(err){
                cb(err,null);
                throw err;

            }else{
                console.log("数据库连接成功!");
                dbObj = client.db(DB_NAME);
                cb(null,dbObj);
            }
        })
    }
}

