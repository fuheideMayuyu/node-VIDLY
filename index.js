const helmet = require('helmet');
const Morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();

const logger = require('./logger')

app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key=value&key=value
app.use(express.static('public')); // 提供静态内容
app.use(helmet()); // 为express应用提供安全保护
app.use(Morgan('tiny')); // HTTP请求日志记录

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
  res.send('Hello World !!!!')
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