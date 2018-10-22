const router = require('koa-router')()
const OSS = require('ali-oss')
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIEZYhotWL7GC9',
  accessKeySecret: 'kxbwa9nmlW5hjA9ImNrqyEFFtvgoTg',
  bucket: 'parentschool'
})
// const upload = require('../../controller/upload')
const upload = require('../../controller/newUpload')
console.log(12333)
module.exports = router.post('/upload',upload.receive.single('file'),upload.uploadToOSS(client))