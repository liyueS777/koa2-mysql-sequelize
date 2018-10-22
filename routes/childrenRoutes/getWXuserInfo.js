const router = require('koa-router')()
const getWXuserInfo = require('../../controller/getWXuserInfo')
module.exports = router.post('/getWXuserInfo',getWXuserInfo)