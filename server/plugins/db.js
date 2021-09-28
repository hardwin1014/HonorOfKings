module.exports = app => {
	const mongoose = require('mongoose')
	// 本地Mongodb身份验证
	mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
		useNewUrlParser: true
	})
}
