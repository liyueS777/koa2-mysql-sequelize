const router = require('koa-router')()
const addActivity = require('../../controller/addActivity')
module.exports = router.post('/addActivity',addActivity)