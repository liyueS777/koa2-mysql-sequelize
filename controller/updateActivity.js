const sqlQuery = require('../config/mysqlCreateConnect').query
module.exports = async ctx => {
    console.log(123, ctx.request.body)
    // let checkHeaders = ctx.request.headers.message
    // 这里的条件应该是只要有一个不符合 
    if (ctx.request.body.id && ctx.request.body.yx_name) {
        const {
            id,
            yx_name,
            yx_link
        } = ctx.request.body;
        try {
            let res = await sqlQuery('update ?? set yx_name = ?,yx_link=? where id = ?',['testN',yx_name,yx_link,id])
            ctx.body = {
                code: 1,
                msg: "message匹配正确",
                result: {
                    message:"更新数据成功",
                    testN_list:res
                }
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: -1,
                msg: "数据请求异常~",
                result: {}
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "缺少相应请求参数",
            result: {}
        }
    }

}