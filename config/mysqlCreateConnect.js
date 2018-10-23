const mysql = require('mysql');
const configs = require('./index')
// 为了安全起见，默认情况下是不允许执行多条查询语句的。要使用多条查询语句的功能，就需要在创建数据库连接的时候打开这一功能：

// var connection =  mysql.createConnection( { multipleStatements: true } );  
// const pool = mysql.createPool({
//   host     :  '172.18.1.77',
//   user     :  'root',
//   password :  'club@1.77',
//   database :  'yxq',
//   // multipleStatements: true
// })
const pool = mysql.createPool(configs.database)
let query = function( sql, values ) {
  console.log('查询语句：',sql,values)
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(`数据库${'yxq'}连接异常`)
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            console.log(`数据库${'yxq'}连接打开成功`)
            resolve( rows )
          }
          connection.release();
          console.log(`数据库${'yxq'}关闭了`)
        })
      }
    })
  })
}

module.exports = { query }