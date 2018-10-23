const configs = require('../config/index')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    configs.database.database,//数据库名
    configs.database.user,//数据库用户名
    configs.database.password,//密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': configs.database.host, // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
        'define': {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            'underscored': true
        },
        'timezone': "+08:00"//东八区
    }
);
module.exports = {
    sequelize,
    Sequelize
};