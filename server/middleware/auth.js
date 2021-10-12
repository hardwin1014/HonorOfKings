module.exports  = options => {
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const AdminUser = require('../models/AdminUser')

  return  async(req, res, next) => {
	  // 后端处理请求头
	  // 1. 获取前端传过来的token，使用jwt.verify进行解密，
	  // 2. 拿到id再数据库中进行查找，把user挂载到req上面，后面也能获取到req.user
	  // token 不能为空
	  const token = String(req.headers.authorization || '').split(' ').pop()
	  assert(token, 401 ,'请先登陆！') // 请提供jwt token
	  // jwt.decode 解开但是不会验证   所以 verify 验证
	  // 因为在中间件中访问不到app。所以使用req.app
	  const { id } = jwt.verify(token, req.app.get('secret'))
	  assert(id, 401 ,'请先登陆！') // 请提供 jwt token

	  //后面想用，就挂载到req上面，表示客户端请求的是谁
	  req.user = await AdminUser.findById(id)
	  assert(req.user, 401, '请先登陆！')
	  await next()
  }
}

// 这样调用的时候需要加()才能得到中间件
