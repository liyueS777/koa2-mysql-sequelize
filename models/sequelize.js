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
        'timezone': "+08:00",//东八区
        // 是否同步
        sync: { force: true },
    }
);
module.exports = {
    sequelize,
    Sequelize
};

// const sequelize = new Sequelize('database', 'username', 'password', {
//     // 数据库类型，支持: 'mysql', 'sqlite', 'postgres', 'mssql'
//     dialect: 'mysql',
//     // 自定义链接地址，可以是ip或者域名，默认本机：localhost
//     host: 'my.server.tld',
//     // 自定义端口，默认3306
//     port: 12345,
//     // postgres使用的参数,连接类型，默认：tcp
//     protocol: null,
//     // 是否开始日志，默认是用console.log
//     // 建议开启，方便对照生成的sql语句
//     logging: true,
//     // 默认是空
//     // 支持: 'mysql', 'postgres', 'mssql'
//     dialectOptions: {
//       socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//       supportBigNumbers: true,
//       bigNumberStrings: true
//     },
//     // sqlite的存储位置,仅sqlite有用
//     // - 默认 ':memory:'
//     storage: 'path/to/database.sqlite',
  
//     // 是否将undefined转化为NULL
//     // - 默认: false
//     omitNull: true,
//     // pg中开启ssl支持
//     // - 默认: false
//     native: true,
//     // 数据库默认参数,全局参数
//     define: {
//       underscored: false
//       freezeTableName: false,
//       charset: 'utf8',
//       dialectOptions: {
//         collate: 'utf8_general_ci'
//       },
//       timestamps: true
//     },
//     // 是否同步
//     sync: { force: true },
//     // 连接池配置
//     pool: {
//       max: 5,
//       idle: 30000,
//       acquire: 60000,
//     },
//     isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
//   })