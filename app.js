const Koa2 = require('koa')
const app = new Koa2()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const koaStatic = require('koa-static')




const views = require('koa-views')
// const util = require('./util/index')
const config = require('./config/index')
const routers = require('./routes/index')
// 用于解析ctx.body 中间件
app.use(bodyParser())


//环境变量 如果用 pm2 启动的话，那么对应json里面的env的
console.log('环境变量：',process.env.domain)


// 配置静态资源加载
app.use(koaStatic(path.join(__dirname), './public'))
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

const accessUrl = {
    '/': true,
    '/favicon.ico': true,
    '/apiKoa/upload': true,
    '/apiKoa/upload/location': true,
}
//路由拦截
app.use(async (ctx, next) => {
    console.log('每一次', ctx.method, ctx.request.body.token, ctx.request.query.token)

    // ctx.url 是带参数的，像get请求 ，但ctx.path 是不带参数的
    // ctx.request.path 是真正的不带参数的url,get请求要注意哦用这个
    if (accessUrl[ctx.request.path]) {
        console.log('next')
        await next()
    } else if ((ctx.request.body.token && ctx.method == 'POST') || (ctx.request.query.token && ctx.method == "GET")) {
        console.log('next')
        await next()
    } else {
        ctx.body = await {
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