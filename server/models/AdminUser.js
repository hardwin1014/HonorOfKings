const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 默认查的时候不要带有这个数据
    set(val) {
      // 明文密码加密bcryptjs
      // 第一个参数:val 是值，10-12是加密指数
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
