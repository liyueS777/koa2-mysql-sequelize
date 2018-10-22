const multer = require('koa-multer')
var co = require('co');
var fs = require('fs');
var md5 = require('md5');
var path = require("path");

// 创建storage 
var storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: path.join(process.cwd(),"tempFiles"),
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
        console.log(file);
        var fileFormat =(file.originalname).split(".");
        var date = new Date();
        var randomFileName = file.originalname + date.getTime().toString() + parseInt(Math.random()*100000).toString();
        console.log(randomFileName)
        var fileNewName = file.mimetype.indexOf("image/") >=0 ? (md5(randomFileName) + "." +file.mimetype.replace("image/","")): "NOTIMAGE";
        cb(null, fileNewName);
    }
});
//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    //其他设置请参考multer的limits
    //limits:{}
});
// 上传至阿里云oss并返回文件链接
var uploadToOSS = function(client){
    return async function(ctx,next){
        var alioss_upfile = function(){
            return new Promise((resolve,reject)=>{
                var {req,res} = ctx
                if (ctx.req.file) {
                    const {filename, path}  = ctx.req.file;
                    console.log('filename, path:',filename, path)
                    if(filename == "NOTIMAGE"){
                        console.log('ok2')
                        fs.unlinkSync(path);
                        
                        ctx.response.body = {
                                Code: -1,
                                ErrMsg: "上传格式不正确"
                        }
                        resolve(next());
                    }
                    else{
                        console.log(111)
                        var result;
                        co(function* () {
                            console.log('ok1')
                            var stream = fs.createReadStream(path);
                            var size = fs.statSync(path).size;
                            result = yield client.putStream(
                                'AA'+"/"+filename, stream, {contentLength: size});
                                console.log('result:',result)
                            if(Object.keys(result).length){
                                console.log('ok',result.url)
                                // 删除文件
                                fs.unlinkSync(path);
                                ctx.response.body =  {
                                    "Code": 0,
                                    "ErrMsg": "上传成功",
                                    "Link":result.url
                                }
                                console.log('opop');
                                resolve(next());
                            }else{
                                ctx.body =  {
                                    Code: -1,
                                    ErrMsg:"上传失败，请稍后再试！"
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                            fs.unlinkSync(path);
                            ctx.body =  {
                                Code: -1,
                                ErrMsg:"上传异常，请稍后再试！"
                            }
                        });
                        console.log(222)
                        
                    }
                }
                else {
                    ctx.body = {
                        ErrMsg:'没戏'
                    }
                }
            })
        }
        await alioss_upfile();
        
    }
}
module.exports = {
    receive:upload,
    uploadToOSS: uploadToOSS
}