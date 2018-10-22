const router = require('koa-router')()
const getImgUrl = require('../../controller/getImgUrl')
module.exports = router.get('/getImgUrl',getImgUrl)