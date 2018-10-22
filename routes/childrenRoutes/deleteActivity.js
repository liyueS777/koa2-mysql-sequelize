const router = require('koa-router')()
const deleteActivity = require("../../controller/deleteActivity")
module.exports = router.post('/deleteActivity',deleteActivity)