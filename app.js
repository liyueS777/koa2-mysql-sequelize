const Koa2 = require('koa')
const app = new Koa2()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const koaStatic = require('koa-static')
const session = require("koa-session")


// 初始化redis
const redisServer = require('./redisInit/redisInit')
const sessionConfig = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 1000*1*10*60,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false
}
app.use(session(sessionConfig,app))

const views = require('koa-views')
// const util = require('./util/index')
const config = require('./config/index')
const routers = require('./routes/index')
// 用于解析ctx.body 中间件
app.use(bodyParser())


//环境变量 如果用 pm2 启动的话，那么对应json里面的env的
console.log('环境变量：',process.env.domain)


// 配置静态资源加载
// app.use(koaStatic(path.join(__dirname), './public'))
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));
app.keys = ["ly"];
const accessUrl = {
    '/': true,
    '/favicon.ico': true,
    '/apiKoa/upload': true,
    '/apiKoa/upload/location': true,
}
//路由拦截
app.use( async (ctx, next) => {
    console.log('session:',ctx.session);
    console.log('cookie:',ctx.cookies.get('cid'));
    console.log('路由信息：', '路径：',ctx.path,'方法：',ctx.method,ctx.method=='get'?ctx.request.query:ctx.request.body)

    // ctx.url 是带参数的，像get请求 ，但ctx.path 是不带参数的
    // ctx.request.path 是真正的不带参数的url,get请求要注意哦用这个
    if (accessUrl[ctx.request.path]) {
        console.log('next')
        await next()
    } 
    else if ((ctx.request.body.token && ctx.method == 'POST') || (ctx.request.query.token && ctx.method == "GET")) {
        try{
            var val = await redisServer.getState({key:"liyue1"});
            console.log('验证成功',val);
            await next()
        }catch(e){
            ctx.body = {
                code:-1,
                msg:"token已失效或者数据异常"
            }
        }
        
    } else {
        ctx.body =  {
            msg: "没有登录token"
        }
    }

});
// 初始化路由
app
.use(routers.routes())
.use(routers.allowedMethods())

app.use(async (ctx) => {
    if (ctx.url == "/" && ctx.method == "GET") {
        await ctx.render('index', {
            title: 'hellow ejs'
        })
    }

}); app.listen(config.port, function () {
    console.log(`已经在端口${config.port}启动了`)
});