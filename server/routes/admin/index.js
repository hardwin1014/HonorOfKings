module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')  // 使用方法 assert(判断到字段，如果错误给出状态码，如果错误提示信息)
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true //表示合并URL参数
    })

   // 导入Schema模板
   // const Category = require('../../models/Category')

    // 导入Middleware
    const  authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')


    // 分类接口操作
    // 增
    router.post('/',  authMiddleware(), async (req, res) => {
      const model = await req.Model.create(req.body)
      res.send(model)
    })

    // 改
    router.put('/:id',  authMiddleware(), async (req, res) => {
        // console.log(req.params.id,req.body)
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 分类列表
    // 添加中间件
    router.get('/', authMiddleware(), async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        } //如果是分类就关联查询，不是的话就传空对象
        // 有的接口需要关联查询，有的不需要，所以使用setOptions 动态去提示
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    });

    // 根据ID查
    router.get('/:id',  authMiddleware(), async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 删除分类
    router.delete('/:id',  authMiddleware(), async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })

      // 中间件统一处理 这里面有用户登陆的中间件 和 自动获取模型的中间件
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    // 设置中间件
    // 上传图片
    // 使用一个专门处理上传文件的中间件，express无法处理上传的数据  multer
    const multer = require('multer')
    // dest: __dirname 表示当前文件夹绝对地址
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 允许接口接收单个上传文件upload.single('file')  file是文件名称上传的
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file // 一定要加upload才有res.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        // 默认不取密码，写个加号，取出来，不然验证的时候拿不到
        // if(!user){
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        assert(user, 422, '用户不存在')


        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        // if(!isValid){
        //     return res.status(422).send({
        //         message: '密码错误！'
        //     })
        // }
        assert(isValid, 422, '密码错误！')

        // 3.返回token
        // 如果有一个值，证明在获取get
        const token = jwt.sign({id: user._id}, app.get('secret'))
        // username: username  用户名都是我们拿到id获取出来的  ，这里可以加任何数据
        res.send({token})
    })

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
