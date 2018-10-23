const {
    sequelize,
    Sequelize
} = require('./sequelize');
/**
 * testc
 */

// var User = sequelize.define(
//     // 默认表名（一般这里写单数），生成时会自动转换成复数形式
//     // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
//     'user',
//     // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
//     {
//         'emp_id': {
//             'type': Sequelize.CHAR(10), // 字段类型
//             'allowNull': false,         // 是否允许为NULL
//             'unique': true              // 字段是否UNIQUE
//         },
//         'nick': {
//             'type': Sequelize.CHAR(10),
//             'allowNull': false
//         },
//         'department': {
//             'type': Sequelize.STRING(64),
//             'allowNull': true
//         }
//     }
// );
const taggingtest = sequelize.define('taggingtest', {
    yx_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        unique: true
    },
    public_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        unique: true
    }
}, {
    // 自定义表名
    'freezeTableName': true,
    //'tableName': 'xyz_users',

    // 是否需要增加createdAt、updatedAt、deletedAt字段
    'timestamps': true,

    // 不需要createdAt字段 的时候就是false
    'createdAt': 'ctime',

    // 将updatedAt字段改个名
    'updatedAt': 'utime',

    // 将deletedAt字段改名
    // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
    'deletedAt': 'dtime',
    'paranoid': false,
});
// testa.sync({force: true})//创建表//true为强制删除后
taggingtest.sync() //创建表
module.exports = taggingtest;