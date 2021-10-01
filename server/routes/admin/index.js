module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams: true //表示合并URL参数
    })

   // 导入Schema模板
   // const Category = require('../../models/Category')

    // 分类接口操作
    // 增
    router.post('/', async (req, res) => {
      const model = await req.Model.create(req.body)
      res.send(model)
    })

    // 改
    router.put('/:id', async (req, res) => {
        console.log(req.params.id,req.body)
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分类列表
    // router.get('/', async (req, res) => {
    //     const items = await req.Model.find().populate('parent').limit(10)
    //     res.send(items)
    // })
    router.get('/', async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        } //如果是分类就关联查询，不是的话就传空对象
        // 有的接口需要关联查询，有的不需要，所以使用setOptions 动态去提示
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    });

    // 根据ID查
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', async (req, res, next)=> {
        // 将小写的复数形式转成大写的单数 inflection插件
        // 最后在scheme里面找对应的模型
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next()
    },router) // 设置中间件


    // 上传图片
    // 使用一个专门处理上传文件的中间件，express无法处理上传的数据  multer
    const multer = require('multer')
    // dest: __dirname 表示当前文件夹绝对地址
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 允许接口接收单个上传文件upload.single('file')  file是文件名称上传的
    app.post('/admin/api/upload',upload.single('file'), async (req, res) => {
        const file = req.file // 一定要加upload才有res.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}
