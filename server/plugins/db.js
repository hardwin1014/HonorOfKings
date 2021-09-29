module.exports = app => {
	const mongoose = require('mongoose')
	// 本地Mongodb身份验证
	mongoose.connect('mongodb://admin:123456@localhost:27017/node-vue-moba?authSource=admin',{
		useNewUrlParser: true
	})
}
