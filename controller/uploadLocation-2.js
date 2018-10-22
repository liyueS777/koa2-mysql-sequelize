const Koa2 = require('koa')
const app = new Koa2()
const koaBody = require('koa-body'); //使用koa-body中间件后，即可通过ctx.request.files获取上传的文件
app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        strict  : false,  //如果为true，不解析GET,HEAD,DELETE请求
        // uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
}}));
const fs = require('fs')
const path = require('path')
module.exports = async ctx => {
    console.log('ffffffffffff:',ctx.request.files)
    var file = ctx.request.files.file
    console.log(file.name, file.path)
    var nameArr = file.name.split('.');
    nameArr[0] = nameArr[0] + Math.floor(Math.random() * 100000000);

    // var tempPath = path.resolve(__dirname, '../') + '/temp' + '/imgs/' + nameArr.join("");
    var p = path.resolve(__dirname,'../')+'\\public\\upload\\'+nameArr.join(".");
    console.log('pppp:',p)
    // fs.readFile(file.path, (err, data) => {
    //     if (err) return ctx.body = {
    //         code: -1,
    //         msg: "图片上传异常~",
    //     }
    //     console.log(data)
    //     fs.writeFile(p, data, errW => {
    //         if (errW) {
    //             console.log('errWWWWWWWWWWWWWWW:',errW)
    //             return ctx.body = {
    //                 code: -1,
    //                 msg: "图片上传异常~",
    //             }
    //         }
    //         console.log('okkk')
    //         ctx.body = {
    //             code: 1,
    //             msg: "图片上传成功~",
    //             Link: p
    //         }
    //     })
    // })


    var s =  fs.createReadStream(file.path);
    var w = fs.createWriteStream(p);
    s.pipe(w);
    ctx.body = {
        code: 1,
        msg: "图片上传成功~",
        Link: 'http://localhost:'+'9898'+'/public/upload/'+nameArr.join(".")
    }

}