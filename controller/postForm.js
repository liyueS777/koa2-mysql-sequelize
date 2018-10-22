// const dbUtils = require('../util/db')
const r = require('../util/index').returnResult
const path = require('path')
const fs = require('fs')
module.exports =  async ctx => {
    console.log("ctx.request.body:",ctx.request.body)
    if(!ctx.request.body.id){
    ctx.body = r(0,{
        msg:'缺少对应参数'
    })
        
    }else {
        // let _sql = `select * from lyNo1`
        // let result = await dbUtils.query(_sql);
        // console.log('result:',result)
        // ctx.body = {
        //     code:1,
        //     msg:'查询信息成功',
        //     result:123
        // }
        ctx.type = 'html'
        var path1 = path.join(__dirname,'/index.html')
        // var html = fs.createReadStream(path1);
        // console.log(html)
        ctx.body = fs.createReadStream(path1);
    }
}