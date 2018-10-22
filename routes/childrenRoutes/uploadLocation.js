const router = require('koa-router')()
const uploadLocation = require('../../controller/uploadLocation')
console.log(12333)
module.exports = router.post('/upload/location',uploadLocation.upload.single("file"),uploadLocation.uploadController)