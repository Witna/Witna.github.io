var express = require("express");
var router = express.Router();

var jm = require("./tools/jm");
var {conn} = require("./tools/db");

var {setError} = require("./tools");

var {ObjectID} = require("mongodb");


router.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"前后端分离vue项目的接口地址"
    })
})



// 增加播放量
router.get("/getOrder",(req,res)=>{
    let musicname = req.query.musicname;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("songlist").findOne({musicname},(err,result)=>{
            setError(err,res,db);
            let  num1 = result.hotnum;
            let num2 = num1*1+1;

            db.collection("songlist").update(result,{ $set: { "hotnum": num2 } },(err,result)=>{
                if(err){
                    res.json({
                        code:404,
                        msg:"修改失败"
                    });
                    db.close();
                }else{
                    res.json({
                        code:200,
                        msg:"修改成功"
                    })
                    db.close();
                }
            })
        })
    })
  
})

//删除评论
router.get("/deleteTalk",(req,res)=>{
    let _id = ObjectID(req.query._id);

    // let songId = req.query.songId;  
    conn((err,db)=>{
        setError(err,res,db);                
        db.collection("talk").deleteOne({_id},(err,result)=>{
            if(err){
                res.json({
                    code:404,
                    msg:"删除失败"
                });
                db.close();
            }else{
                res.json({
                    code:200,
                    msg:"删除成功"
                })
                db.close();
            }
        })       
    })   
})



//   所有评论
router.get("/allTalk",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("talk").find({}).sort({_id:-1}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"搜索成功"
                });
                db.close();
                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"搜索失败"
                });
                db.close();
            }
        })
    })
})


// 添加评论信息
router.get("/talkmsg",(req,res)=>{
    let userId= ObjectID(req.query.userId);
    let _id = ObjectID(req.query.songId);
    let msg = req.query.msg;
    let nowTime = req.query.nowTime;
    let nickname = req.query.nickname;
    
    console.log(_id)
    conn((err,db)=>{
        setError(err,res,db);     
        db.collection("songlist").findOne({_id},(err,result)=>{
            setError(err,res,db);
                let songId = _id;
                console.log(result)
                db.collection("talk").insert({userId,songId,msg,nowTime,nickname,result},(err,list)=>{
                    if(err){
                        res.json({
                            code:404,
                            msg:"提交失败"
                        });
                        db.close();
                    }else{
                        res.json({
                            list,
                            code:200,
                            msg:"提交成功"
                        })
                        db.close();
                    }
                })   
                
        })
             
    })
   
})
// 个人收藏
router.get("/usercar",(req,res)=>{
    let userId = req.query.userId;
    // console.log(userId);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("songcar").find({userId}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"搜索成功"
                });
                db.close();                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"搜索失败"
                });
                db.close();
            }
        })
    })
})

// 取消收藏

router.get("/quxiao",(req,res)=>{
    let userId = req.query.userId;
    let songId = req.query.songId;  
    conn((err,db)=>{
        setError(err,res,db);                
        db.collection("songcar").deleteOne({userId,songId},(err,result)=>{
            if(err){
                res.json({
                    result,
                    code:404,
                    msg:"取消失败"
                });
                db.close();
            }else{
                res.json({
                    code:200,
                    msg:"取消成功"
                })
                db.close();
            }
        })       
    })   
})
// 收藏歌单
router.get("/songcar",(req,res)=>{
    let userId = req.query.userId;
    let songId = req.query.songId;  
    let musicname = req.query.musicname;  
    let name = req.query.name;
    let img = req.query.img;   
    conn((err,db)=>{
        setError(err,res,db);                
        db.collection("songcar").insert({userId,songId,musicname,name,img},(err,result)=>{
            if(err){
                res.json({
                    result,
                    code:404,
                    msg:"收藏失败"
                });
                db.close();
            }else{
                res.json({
                    code:200,
                    msg:"收藏成功"
                })
                db.close();
            }
        })       
    })   
})



//  所有歌手
router.get("/allsinger",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("singer").find({}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"搜索成功"
                });
                db.close();
                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"搜索失败"
                });
                db.close();
            }
        })
    })
})
// 歌曲排行
router.get("/orderSong",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("songlist").find({}).sort({hotnum:-1}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"搜索成功"
                });
                db.close();
                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"搜索失败"
                });
                db.close();
            }
        })
    })
  
})


//所有歌曲
router.get("/allsong",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("songlist").find({}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"搜索成功"
                });
                db.close();
                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"搜索失败"
                });
                db.close();
            }
        })
    })
  
})

// 修改昵称

router.get("/update",(req,res)=>{
    let _id=req.query._id;
    _id = ObjectID(_id);
    let nickname= req.query.nickname;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("user").update({_id},{ $set: { "nickname": nickname } },(err,result)=>{
            if(err){
                res.json({
                    result,
                    code:404,
                    msg:"修改失败"
                });
                db.close();
            }else{
                res.json({
                    code:200,
                    msg:"修改成功"
                })
                db.close();
            }
        })
    })
  
})

//    注册

router.get("/zhuce",(req,res)=>{
    let phone= req.query.phone;
    let userpwd = req.query.userpwd;
    
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("user").findOne({phone},(err,result)=>{
            setError(err,res,db);
            if(result){                
                res.json({
                    result,
                    code:404,
                    msg:"已存在该用户，请重新输入！"
                });
                db.close();
                
            }else{
                userpwd = jm(userpwd);
                let nickname = req.query.phone;
                db.collection("user").insert({phone,userpwd,nickname},(err,result)=>{
                    if(err){
                        res.json({
                            result,
                            code:404,
                            msg:"注册失败"
                        });
                        db.close();
                    }else{
                        res.json({
                            code:200,
                            msg:"注册成功"
                        })
                        db.close();
                    }

                })
                
            }
        })
    })
   
})

//     登陆
router.get("/login",(req,res)=>{
    let phone= req.query.phone;
    let userpwd = req.query.userpwd;
    userpwd=jm(userpwd);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("user").findOne({phone,userpwd},(err,result)=>{
            setError(err,res,db);
            if(result){
                res.json({
                    result,
                    code:200,
                    msg:"登陆成功"
                });
                db.close();
                
            }else{
                res.json({
                    result,
                    code:404,
                    msg:"手机或密码错误，请重新输入！"
                });
                db.close();
            }
        })
    })
  
})




module.exports = router;