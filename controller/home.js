const r = require('../util/index').returnResult
module.exports = async ctx => {
    console.log(ctx.request.query)
    // post 请求是 ctx.request.body , post请求需要 bodyparser 来解析
    // get 请求是 ctx.request.query
    ctx.body = r(1,'成功拉')
    // ctx.redirect('/?id=9090')
}