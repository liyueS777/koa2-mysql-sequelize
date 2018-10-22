const router = require('koa-router')()
const home = require('../../controller/home')
module.exports = router.get('/getGoodsList',home)