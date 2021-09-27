module.exports = app =>{
    const express = require('express')
    const router = express.Router()

   // 导入Schema模板
    const Category = require('../../models/Category')

    // 创建分类接口
    router.post('/categories', async (req, res) => {
      const model = await Category.create(req.body)
      res.send(model)
    })

    // 修改分类接口
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })

    // 分类详情
    router.get('/categoryById/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api',router) // 设置中间件
}
