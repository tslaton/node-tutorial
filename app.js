// Third-Party
const express = require('express')
const bodyParser = require('body-parser')
// Modules
const todoController = require('./controllers/todo-controller')

const app = express()
// Template engine
app.set('view engine', 'ejs')
// Static files
app.use(express.static('./public'))
// Body parsing
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// Fire controllers
todoController(app)

// Listen to port
app.listen(3000)
console.log('Node server is listening on port 3000...')