const router = require('koa-router')()

// const home = require('./childrenRoutes/home')
// const upload = require('./childrenRoutes/upload')
const postForm = require('./childrenRoutes/postForm')
// const checkHeaders = require('./childrenRoutes/checkHeaders')
// const getImgUrl = require('./childrenRoutes/getImgUrl')
const getWXuserInfo = require('./childrenRoutes/getWXuserInfo')
// const uploadLocation = require('./childrenRoutes/uploadLocation')
// const addActivity = require('./childrenRoutes/addActivity')
// const updateActivity = require('./childrenRoutes/updateActivity')
// const deleteActivity = require('./childrenRoutes/deleteActivity')


// 这里的路由是 基于/apiKoa 下面的，要拼接
// router.use('/apiKoa',home.routes(),home.allowedMethods())
// router.use('/apiKoa',upload.routes(),upload.allowedMethods())
router.use('/apiKoa',postForm.routes(),postForm.allowedMethods())
// router.use('/apiKoa',checkHeaders.routes(),checkHeaders.allowedMethods())
// router.use('/apiKoa',getImgUrl.routes(),getImgUrl.allowedMethods())
router.use('/apiKoa',getWXuserInfo.routes(),getWXuserInfo.allowedMethods())//测试sequelize连接池的接口
// router.use('/apiKoa',uploadLocation.routes(),uploadLocation.allowedMethods())
// router.use('/apiKoa',addActivity.routes(),addActivity.allowedMethods())
// router.use('/apiKoa',updateActivity.routes(),updateActivity.allowedMethods())
// router.use('/apiKoa',deleteActivity.routes(),deleteActivity.allowedMethods())
module.exports = router;