const redisConfig = {
    local:{
        "host" : "0.0.0.0",
        "port" : "6379",
        "password":"ly18820146660",
        "db" : 0,
        "ttl" : 3600*24*30,
        "logErrors" : true
    },
    development:{},
    production:{},
}
module.exports = redisConfig