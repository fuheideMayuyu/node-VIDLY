const helmet = require('helmet');
const Morgan = require('morgan');
const Joi = require('joi');
const startupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const express = require('express');
const app = express();
const logger = require('./logger')
const config = require('config')
// process.env.NODE_ENV // 未设置返回undefined
// console.log('环境', app.get('env'))
if(app.get('env') === 'development'){
  // app.use(Morgan('tiny')); // HTTP请求日志记录
  startupDebug('Morgan enabled...')
}

// Db work...
dbDebug('Connected to the database...')

// Configuration


// console.log('Application Name: '+ config.get('name'))
// console.log('Mail Server: '+ config.get('mail.host'))
// console.log('Mail Password: '+ config.get('mail.password'))

// 导入模板引擎
app.set('view engine', 'pug')
// 设置保存模板的路径
app.set('views', './views')


app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key=value&key=value
app.use(express.static('public')); // 提供静态内容
app.use(helmet()); // 为express应用提供安全保护


app.use(logger)


const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
]

app.use(function(req,res,next) {
  console.log('Authenticating...')
  next()
})

app.get('/', (req,res) => {
  // res.send('Hello World !!!!')
  res.render('index', {title: "My Express App", message: "Hello"})
})

app.post('/api/courses',(req,res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

// 设置环境变量
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))