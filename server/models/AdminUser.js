const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String},
    password: {
        type: String,
        set(val){
            // 明文密码加密bcryptjs
            // 第一个参数:val 是值，10-12是加密指数
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)
