// mock
// 导入express
const express = require('express')
const app = express()
const apiRouter = express.Router()

var goods = require('./goods.json')

apiRouter.get('/goods',(req,res)=>{
  res.json(goods)
})

app.use(apiRouter)

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200); 
    } else { 
        next(); 
    }
});

app.listen(3004,()=>{
  console.log('mock data is running...3004');
})
