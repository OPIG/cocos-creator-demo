// https://github.com/typicode/json-server

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)
// 调用这个之后就可以正常使用patch方法
server.use(jsonServer.bodyParser)
server.use(router)

server.listen('3333', (res,req) => {
  console.log('welcome to use json server!')
})


server.get('/users', (req, res) => {
  res.jsonp(req.query)
})

server.get('/users/:account/:val', (req, res) => {
  console.log(req)
 res.jsonp(req.query)
})

server.delete('/users/:account', (req, res) => {
  res.jsonp(req.query)
})

server.patch('/users/:account', (req, res) => {
  console.log(req)
  res.jsonp(req.query)
})
server.post('/users', (req, res) => {
  console.log(req)
  res.jsonp(req.query)
})
