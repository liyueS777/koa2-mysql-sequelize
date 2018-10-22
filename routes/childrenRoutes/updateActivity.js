const router = require('koa-router')()
const updateActivity = require('../../controller/updateActivity')
module.exports = router.post('/updateActivity',updateActivity)