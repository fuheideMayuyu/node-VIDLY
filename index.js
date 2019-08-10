const Joi = require('joi');
const express = require('express');
const app = express();

const logger = require('./logger')

app.use(express.json());

app.use(logger)

app.use(function(req,res,next) {
  console.log('Authenticating...')
  next()
})

app.get('/', (req,res) => {
  res.send('Hello World !!!!')
})


// 设置环境变量
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))