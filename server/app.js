const express = require('express')
const app = express()

app.use(require('cors')()); // 跨域
app.use(express.json());

require('./plugins/db')(app); // 数据库

require('./routes/admin')(app); // 路由

app.listen(3000,function (){
    console.log('http://127.0.0.1:3000')
})
