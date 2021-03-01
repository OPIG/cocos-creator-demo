// mock
// 导入express
const express = require('express')
const app = express()
const apiRouter = express.Router()

var users = [
{
	name: 'test',
	pwd: '123'
}
]

apiRouter.get('/users',(req,res)=>{
  res.json(users)
})

app.use(apiRouter)

app.listen(8081,()=>{
  console.log('mock data is running...');
})
