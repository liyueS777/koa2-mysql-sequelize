const r = require('../util/index').returnResult
const sqlQuery = require('../config/mysqlCreateConnect').query
module.exports = async ctx => {
    console.log(123, ctx.request.body)
    let checkHeaders = ctx.request.headers.message
    if (!checkHeaders || checkHeaders != 'checkHeaders') {
        ctx.body = {
            code: -1,
            msg: '请先检查message是否包含或者正确'
        }
    }
    // 这里的条件应该是只要有一个不符合 
    else if (!ctx.request.body.pageNum || !ctx.request.body.pageSize || !ctx.request.body.level || !/^[0-9]*$/.test(ctx.request.body.pageNum) || !/^[0-9]*$/.test(ctx.request.body.pageSize)) {
        console.log(123)
        ctx.body = {
            code: -1,
            msg: '参数不完整或者不正确'
        }
    } else {
        console.log(456)
        if (ctx.request.body.username && ctx.request.body.password) {
            const {
                pageSize,
                pageNum,
                level,
                id
            } = ctx.request.body;
            try {
                var ss = decodeURIComponent('%E4%B8%80')
                // let q = `SELECT id,nickname FROM users WHERE level =${level} and id=${id} limit ${(pageNum-1)*pageSize},${pageSize}`

                // 计算总数 当id=X 的总数
                // let qAll = `SELECT count(*) as count FROM users WHERE id =${id}`
                // 多字段查询后计算单总数
                // let resDataNum = await sqlQuery('select count(*) as count from ?? where concat(yx_name,yx_desc) like ?',['testc','%'+ss+'%']);
                let resDataNum = await sqlQuery('select count(*) as count from ??',['testc']);
                // 条件查询当level,id 的分页查询
                // let res = await sqlQuery('select ?,? from users where level = ? and id = ? limit ?,?',["id",'nickname',level,id,(pageNum-1)*pageSize,pageSize]);
                // 模糊查询 查询 yx_name  存在 Hong的分页查询
                // let res = await sqlQuery("select id,yx_name,yx_link from testc where yx_name like ? limit ?,?",['%Hong%',(pageNum-1)*pageSize,pageSize]);
                // 模糊查询 单表多字 SELECT * FROM `magazine` WHERE CONCAT(`title`,`tag`,`description`) LIKE ‘%关键字%
                // let res = await sqlQuery("select id,yx_name,yx_desc from testc where concat(yx_name,yx_desc) like ? limit ?,?",['%'+ss+'%',(pageNum-1)*pageSize,pageSize]);

                //查询返回 字段顺序  asc 升序（不写代表默认） ,desc 降序
                // select * from database order by yx_type asc,yx_desc desc limit ?,?
                let res = await sqlQuery("select id,yx_type,yx_desc from ?? order by yx_type desc limit ?,?",['testc',(pageNum-1)*pageSize,pageSize])


                // SELECT SQL_CALC_FOUND_ROWS * from t_plat_asset_client WHERE id>4 Limit 0,3;SELECT FOUND_ROWS();
                // let over = `select SQL_CALC_FOUND_ROWS id,nickname from user limit ${(pageNum-1)*pageSize},${pageSize};
                // SELECT FOUND_ROWS()`;
                // let res = await sqlQuery(over)
                ctx.body = {
                    code: 1,
                    msg: "message匹配正确",
                    result: {
                        totalCount:resDataNum[0].count,
                        userList: res,
                        pageSize:pageSize,
                        totalPageNum:Math.ceil(resDataNum[0].count/pageSize)
                    }
                }
            } catch (e) {
                console.log(e)
                ctx.body = {
                    code: -1,
                    msg: "数据请求异常~",
                    result: {}
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "缺少相应请求参数",
                result: {}
            }
        }

    }

}