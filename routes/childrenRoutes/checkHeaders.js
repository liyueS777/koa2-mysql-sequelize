const router = require('koa-router')()
const checkHeaders = require('../../controller/checkHeaders')
module.exports = router.post('/checkHeaders',checkHeaders)