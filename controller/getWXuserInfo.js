var fs = require('fs')
var path = require('path')
var request = require('request');
var appId = "wx3465005cc54652b4";

const sequelize = require('../models/sequelize').sequelize
const testa = require('../models/testa')
const testb = require('../models/testb')
const testc = require('../models/testc')
const taggingtest = require('../models/tagging')
module.exports = async ctx => {
    // console.log(ctx.request.body)
    // const {req,res} = ctx;
    // post 请求是 ctx.request.body , post请求需要 bodyparser 来解析
    // get 请求是 ctx.request.query
    console.log('ctx.request.body:', ctx.request.body);
    if (!ctx.request.body.url) {
        ctx.body = {
            msg: '没有url参数',
            code: 0
        }
    } else {
        try {
            /** 
             * --------------------------------------
             * 增，
             * [options.fields] fields
             * 单条create
             * 多条bulkCreate
             */
            //增加一条，自带主键id（已设置主键为 yx_id）
            // var user = await testa.create(
            //     {
            //         yx_name:"xioatesta",
            //         title:'hello',
            //         reply_count:14,
            //         is_public:3,
            //         // yx_id:3
            //     },
            //     {
            //         'fields':['yx_name',"reply_count","is_public"]//数组里面对应的字段才会更新
            //     }
            // );

            //增加多条，自带主键id（已设置主键为 yx_id）
            // var user = await testa.bulkCreate(
            //     [
            //         {
            //             yx_name:"xioaTestD",
            //             title:'hello2',
            //             reply_count:122,
            //             is_public:0,
            //         },
            //         {
            //             yx_name:"xioaTestE",
            //             title:'hello3',
            //             reply_count:1332,
            //             is_public:1,
            //         }
            //     ]
            //     ,
            //     {
            //         'fields':['yx_name',"reply_count","is_public"]//数组里面对应的字段才会更新
            //     }
            // );

            /**
             * -----------------------------------------
             * 查询，条件查询，分页查询，模糊查询，返回总数
             * 1.findAndCountAll() - 分页查询
             */
            // var user = await testa.findAndCountAll({
            //     attributes:["yx_id","is_public","yx_name"],//可供选择的返回字段
            //     //attributes: { exclude: ['baz'] }//这个是排除查询的字段
            //     where:{
            //         // "is_public":{
            //         //     gte:1,//条件查询，大于等于1的is_public
            //         // },
            //         // "yx_name":{
            //         //     $like:'%A%'
            //         // },
            //         "yx_id":1
            //     },
            //     limit:10,//pagesize
            //     offset:0,//pagesize*(pageNum-1),
            //     order:[
            //         ["reply_count",'DESC']//ASC 默认增序，DESC 降序
            //     ]
            // })
            /**
             * -----------------------------------
             * 查询一个 findOne
             */
            // var user = await testa.findOne({
            //     attributes:["yx_id","is_public","yx_name"],//可供选择的返回字段
            //     where:{
            //         // "is_public":{
            //         //     gte:1,//条件查询，大于等于1的is_public
            //         // },
            //         // "yx_name":{
            //         //     $like:'%A%'
            //         // },
            //         "yx_id":1
            //     }
            // })


            /**
             * 更新 update,一条，多条
             */
            // var user = await testa.update(
            //     {
            //         'title':'666',
            //         "is_public":667
            //     },{
            //         where:{
            //             "yx_id":11
            //         }
            //     }
            // );



            /**
             * 删除  destroy
             */
            // var user = await testa.destroy({
            //     where:{
            //         yx_id:3
            //     }
            // })



            /**
             * 关联查询
             * 一对一，一对多，多对多
             */
            // testa.belongsTo(testb,{
            //     foreignKey:'is_public'
            // });
            // testa.hasMany(testb,{
            //     foreignKey:"public_id",
            //     targetKey:'is_public'
            // })
            // var user = await testa.findAndCountAll({
            //     raw: false, // 设置为 true，即可返回源数据
            //     where:{
            //         "reply_count":{
            //             gte:12
            //         }
            //     },
            //     limit:6,
            //     offset:0,
            //     include:[
            //         {model:testb}//默认的字段名为testb，这里是一对一
            //     ]
            //     // order:[
            //     //     "reply_count","DESC"
            //     // ]
            // });

            /**
             * 一对多 hasMany
             */

            //指定User和User_relation的关系为1：1的关系，设定目标为frendid，即查询中 userid = frendid
            //User.belongsTo(User_relation,{foreignKey:'userid',targetKey: 'frendid'});

            // testb.hasMany(testa,{foreignKey:'is_public',targetKey: 'public_id'});
            // testb.hasMany(testc,{foreignKey:"yx_type",targetKey:'public_id'})
            // var user = await testb.findAndCountAll({
            //     attributes:["public_id"],
            //     where:{
            //         $or:[
            //             {
            //                 public_id:1
            //             },
            //             {
            //                 public_id:3
            //             },
            //             {
            //                 public_name:'法务部'
            //             }
            //         ]
            //     },
            //     include:[
            //         {
            //             model:testa,
            //             attributes:["yx_name",'is_public'],//这里是关联表的 只选择的字段
            //         },
            //         {
            //             model:testc,
            //             attributes:{exclude:["yx_link"]}
            //         }
            //     ],
            //     distinct: true//在联表查询中如果不写那么定义的有关联表的统计数量
            // })

            /**
             * 多对多  belongsToMany 
             * 比如 用户 角色 权限 ，登陆后的 用户表、角色表、权限表
             */

            // Note的实例拥有getTags、setTags、addTag、addTags、createTag、removeTag、hasTag方法
            // Note.belongsToMany(Tag, {
            //     'through': Tagging
            // });
            // Tag的实例拥有getNotes、setNotes、addNote、addNotes、createNote、removeNote、hasNote方法
            // Tag.belongsToMany(Note, {
            //     'through': Tagging
            // });
            // testb.belongsToMany(testc, {
            //     through: taggingtest,
            //     foreignKey: "public_id",
            //     targetKey: 'yx_type'
            // })
            // testc.belongsToMany(testb, {
            //     through: taggingtest,
            //     foreignKey: "yx_type",
            //     targetKey: "public_id"
            // });


            // var user = await testb.findAndCountAll({
            //     where: {
            //         // $or: [{
            //         //         public_id: 1
            //         //     },
            //         //     {
            //         //         public_id: 2
            //         //     }
            //         // ],
            //         public_id: 1
            //     },
            //     include: [{
            //         model: testc
            //     }],
            //     distinct: true,
            //     limit: 10,
            //     offset: 0
            // })

            /**
             * 事物的回滚： 表1先增加，然后在增加表3，可在增加表三时 异常没加上，那么表1加的东西不作数的，所以要回滚
             * 这里的sequelize 为实例
             */

            let user = await sequelize.transaction(async (t) => {
                var r1 = await testb.create({
                    public_name: 'IT部2'
                }, {
                    transaction: t
                });
                var r2 =  await testc.create({
                    yx_name:'transaction',
                    yx_type:3
                }, {
                    transaction: t
                });
                return {
                    group:r1,
                    yx:r2
                }


            })
            ctx.body = {
                u: '123',
                user: user // 如果返回就是该条增加后的内容,需要获取“干净”的JSON对象可以调用get({'plain': true})
            }
        } catch (e) {
            console.log('error异常了：', e)
            ctx.body = {
                error: '异常',
                errcode: -1,
                message: e
            }
        }
    }


}