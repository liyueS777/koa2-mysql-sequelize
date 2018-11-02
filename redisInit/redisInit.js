const blueBird = require('bluebird')
const redis = require('redis')
const redisConfig = require('../config/redisConfig')
//启动redis
blueBird.promisifyAll(redis.RedisClient.prototype);
blueBird.promisifyAll(redis.Multi.prototype)

var e = 'local';
// var e = 'production';
if(e in redisConfig){
    console.log('环境变量ok')
    var redisServer = redis.createClient(redisConfig[e])
}else {
    console.error('redis 配置有错误，或者启动时，环境变量未设置')
}
_initRedis(redisServer);//赋予redis getState，setState
function _initRedis(re){
    _setState(re);
    _getState(re);
    _updateState(re);
    _delState(re)
};
function _setState(re){
    re.setState = function(options){
        if("key" in options && "value" in options){
            (typeof options.expire !== "undefined")?
            re.set(options.key,JSON.stringify(options.value),"EX",options.expire):
            re.set(options.key,JSON.stringify(options.value));
            options.success?options.success():null;        
        }else{
            options.fail?options.fail():null;        
        }
    }
}

/**
 * 
 * @param {obj} redis obj 
 */
function _updateState(re){
    re.updateState = function(options){
        re.getAsync(options.key).then((val)=>{
            if(val != "" && val != null){
                var value = JSON.parse(val);
                value = Object.assign(value,options.value);
                (typeof value.ex !== "undefined")?
                re.set(options.key,JSON.stringify(value),"EX",value.ex):
                re.set(options.key,JSON.stringify(value));
                options.success?options.success(value):null; 
            }else{
                options.fail?options.fail():null; 
            }
        })
    }
}

/**
 * 
 * @param {obj} redis 
 */
function _getState(re){
    re.getState = function(options){
        return new Promise((resolve,reject) =>{
            re.getAsync(options.key).then((val)=>{
                //这里能正常返回就不叫做异常，只是有或者没有
                console.log(val,'获取的val')
                if(val != "" && val != null){
                    resolve(typeof val == 'string'?val:JSON.parse(val))
                }else{
                    resolve(0)
                }
            }).catch(err=>{//这里不能说 为空的时候也是异常，这样会抛出错误的，应该是为空
                reject()
            })
        })
        

    }
}
function _delState(re){
    re.delState = function(options){
        return new Promise((resolve,reject)=>{
            re.delAsync(options.key).then(val=>{
                console.log('del',val)
                if(val){
                    resolve(val)
                }else {
                    //0, null
                    resolve(0)
                }
            }).catch(err=>{
                reject()
            })
        })
    }
}
module.exports = redisServer;