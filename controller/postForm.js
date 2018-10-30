// const dbUtils = require('../util/db')
const r = require('../util/index').returnResult
const path = require('path')
const fs = require('fs')
module.exports =  async ctx => {
    if(ctx.session.userInfo){
        ctx.body= {
            code:1,
            msg:"已经登陆"
        }
    }else {
        ctx.session.userInfo = ctx.request.body.userInfo || {name:"default",age:0};
        ctx.body = {
            code:1,
            msg:"登陆成功"
        }
    }
}