
const multer = require('koa-multer');//加载koa-multer模块
const md5 = require('md5')
const fs = require('fs')
const path = require('path')
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    var initFileName = md5(Math.floor(Math.random()*1000000)+fileFormat[0])+'.'+fileFormat[fileFormat.length-1];
    cb(null,initFileName);
  }
})
//加载配置
var upload = multer({ storage: storage });
var fsUnlink = function(ctx,path,errTips){
    fs.unlink(path,(err)=>{
        if(err){
            ctx.body = {
                code:-1,
                msg:"上传异常"
            }
            return console.log(errTips)
        }
    })
}
var uploadController = async (ctx, next) => {
    console.log(666,ctx.req.file);
    if(ctx.req.file){
        const {originalname,mimetype,size,filename} = ctx.req.file
        //判断大小 0.5M
        var p = path.resolve(__dirname,'../public/upload/'+filename);
        console.log('patt:',p)
        if(mimetype.indexOf("image/")<=-1){
            // fsUnlink(ctx,p,'上传的类型异常')
            fsUnlink(ctx,ctx.req.file.path,'上传的类型异常')
            ctx.body = {
                code:-1,
                msg:"上传的图片必须是png,jpg,jpeg类型"
            }
        }
        else if(size/1024/512>1){
            fsUnlink(ctx,p,'上传的大小异常')
            ctx.body = {
                code:-1,
                msg:"上传的数据大小大于0.5M~"
            }
        }else {
            ctx.body = {
                filename: ctx.req.file.filename//返回文件名
            }
        }
        
    }else {
        ctx.body = {
            code:-1,
            msg:"没有对应的图片数据~"
        }
    }
    
}
// router.post('/upload', upload.single('file'), async (ctx, next) => {
//   ctx.body = {
//     filename: ctx.req.file.filename//返回文件名
//   }
// })
module.exports = {
    upload,
    uploadController
}