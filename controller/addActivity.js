const r = require('../util/index').returnResult
const sqlQuery = require('../config/mysqlCreateConnect').query
module.exports = async ctx => {
    console.log(123, ctx.request.body)
    // let checkHeaders = ctx.request.headers.message
    // 这里的条件应该是只要有一个不符合 
    if (!ctx.request.body.name || !ctx.request.body.link || !ctx.request.body.type ) {
        console.log(123)
        ctx.body = {
            code: -1,
            msg: '参数不完整或者不正确'
        }
    } else {
        console.log(456)
        if (ctx.request.body.name && ctx.request.body.type) {
            const {
                name,
                link,
                type,
                desc
            } = ctx.request.body;
            try {
                // 这么写有风险，可能sql注入了
                // let q = `insert into testN (yx_name,yx_link,yx_type,yx_desc) VALUES ("${name}","${link}",${type},"${desc}")`;

                //单条  'insert into testN (yx_name,yx_link,yx_type,yx_desc) values (?,?,?,?)',[name,link,type,desc]

                //多条  'insert into testN (yx_name,yx_link,yx_type,yx_desc) values (?,?,?,?),(?,?,?,?)',[name,link,type,desc,name,link,type,desc]
                // var ssql="insert into testN (yx_name,yx_link,yx_type,yx_desc) values ",vvalue=[];
                // var arr = [
                //     {
                //         yx_name:'aa',
                //         yx_link:'bb',
                //         yx_type:2,
                //         // yx_desc:'cc' 
                //     },
                //     {
                //         yx_name:'aa1',yx_link:'bb1',yx_type:2,yx_desc:'cc1' 
                //     }
                // ]
                // arr.map((v)=>{
                //     ssql+='(?,?,?,?),';
                //     vvalue.push(v.yx_name,v.yx_link,v.yx_type,v.yx_desc)
                // });
                // if(arr.length){
                //     ssql = ssql.slice(0,-1);
                // }
                let res = await sqlQuery('insert into testN (yx_name,yx_link,yx_type,yx_desc) values (?,?,?,?)',[name,link,type,desc]);//单条
                // let res = await sqlQuery(ssql,vvalue);//多条
                // let res1 = await sqlQuery('SELECT LAST_INSERT_ID()')
                let resList = await sqlQuery('select * from testN')
                ctx.body = {
                    code: 1,
                    msg: "message匹配正确",
                    result: {
                        message:"新增数据成功",
                        testN_list:resList,
                        res
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