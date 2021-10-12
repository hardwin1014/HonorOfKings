module.exports = options => {

	return async (req, res, next) => {
		// 将小写的复数形式转成大写的单数 inflection插件
		// 最后在scheme里面找对应的模型
		const modelName = require('inflection').classify(req.params.resource);
		req.Model = require(`../models/${modelName}`);
		next()
	}
}
