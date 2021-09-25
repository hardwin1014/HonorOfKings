module.exports = app =>{
    const express = require('express')
    const router = express.Router()

   // 导入Schema模板
    const Category = require('../../models/Category')
    router.post('/categories', async (req, res) => {
      const model = await Category.create(req.body)
      console.log(req)
      res.send(model)
    })


    app.use('/admin/api',router) // 设置中间件
}
