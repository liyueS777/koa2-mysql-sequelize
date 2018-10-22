const sqlQuery = require('../config/mysqlCreateConnect').query
module.exports = async ctx => {
    console.log('update',ctx.request.body)
    if(!ctx.request.body.id){
        ctx.body = {
            code:-1,
            msg:'参数不完整或者不正确'
        }
    }else {
        try{
            const { id } = ctx.request.body
            let res = await sqlQuery('delete from ?? where id = ?',['testN',id]);
            ctx.body = {
                code:1,
                msg:"删除数据成功",
                res
            }
        }catch(e){
            console.log(e)
            ctx.body = {
                code:-1,
                msg:"删除数据异常"
            }
        }
    }
}