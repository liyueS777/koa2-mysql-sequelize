var fs = require('fs')
var path = require('path')
var request = require('request')
module.exports = async ctx => {
    // console.log(ctx.request.body)
    // const {req,res} = ctx;
    // post 请求是 ctx.request.body , post请求需要 bodyparser 来解析
    // get 请求是 ctx.request.query
    console.log('ctx.request.body:',ctx.request.body)
    if(!ctx.request.query.url){
        ctx.body = {
            ErrMsg:'缺少相应参数'
        }
    }else {
        var url = decodeURI(ctx.request.query.url)
        var date = new Date();
        var randomFileName = date.getTime().toString() + parseInt(Math.random()*1000000).toString();
        var filePath = path.join(__dirname,'../../'+ randomFileName+ '.jpg');
        console.log(randomFileName,filePath)
        
        // ctx.response.writeHead(200, {
        //     'Content-Type': 'image/jpg'
        // });
        // ctx.set("Content-Type","image/png")
        // request.get(url).pipe(ctx.response);
        var a = await request.get(url);
        console.log(a)
        ctx.body = a;
        // a.pipe(ctx.body)
    }
    
}