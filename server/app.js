const express = require('express')
const app = express()

app.use(require('cors')()); // 跨域

// 生成秘钥， 第二个参数应该放在环境变量中去
app.set('secret', 'sdadasqwqdasdas')

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app); // 数据库
require('./routes/admin')(app); // 路由

app.listen(3000,function (){
    console.log('http://127.0.0.1:3000')
})
