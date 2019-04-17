var express = require("express");

var app = express();

const hostname = "0.0.0.0";

const port = 1810;

var vueRouter = require("./vue");

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1');
    next();

})



app.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"这是我的后端服务器接口！"
    })
})
app.get("/demo",(req,res)=>{
    res.json({
        code:200,
        params:req.query.uid,
        msg:"demo-demo",

    })
})





app.use(express.json());   // 处理 POST  请求 提交 body 参数   req.body    
app.use(express.urlencoded({ extended: false })); //  form method="POST"
 
app.use("/vue",vueRouter);
 
app.listen(port,hostname,()=>{
    console.log(`my server is running at http://${hostname}:${port}`)
})