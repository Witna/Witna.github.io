var http = require("http");
var hostname = "0.0.0.0";
var port = 4000;

http.createServer((req,res)=>{
    if(req.url!=="/favicon.ico"){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write("<h2>wuhan1810 daydayup</h2>");
        res.end();
    }
}).listen(port,hostname,()=>{
    console.log(`my ECS server is running at http://http://${hostname}:${port}`);
})