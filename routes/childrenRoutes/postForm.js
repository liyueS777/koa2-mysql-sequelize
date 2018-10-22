const router = require('koa-router')()
const postForm = require('../../controller/postForm')
module.exports = router.post('/postForm',postForm)