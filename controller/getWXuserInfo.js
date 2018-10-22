var fs = require('fs')
var path = require('path')
var request = require('request');
var appId = "wx3465005cc54652b4"
module.exports = async ctx => {
    // console.log(ctx.request.body)
    // const {req,res} = ctx;
    // post 请求是 ctx.request.body , post请求需要 bodyparser 来解析
    // get 请求是 ctx.request.query
    console.log('ctx.request.body:', ctx.request.body);
    if (!ctx.request.body.url) {
        ctx.body = {
            msg: '没有url参数',
            code: 0
        }
    } else {
        try {
            var redirect_uri = ctx.request.body.url;
            var res = await request.get(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
            ctx.body = {
                u: '123',
                res
            }
        } catch (e) {
            ctx.body = {
                error: '异常',
                errcode: -1
            }
        }
    }


}