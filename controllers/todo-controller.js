// Third-party
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Connect to mLab database
const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
mongoose.connect(`mongodb://${db_user}:${db_pass}@${db_host}`)

// Create data schema
const todoSchema = new mongoose.Schema({
  item: String,
})

const Todo = mongoose.model('Todo', todoSchema)

// Placeholder data
let data = [
  {item: 'practice Node.js'},
  {item: 'enable Babel and ES6 in Node'},
  {item: 'learn Postgres'},
  {item: 'learn Hapi'},
  {item: 'build app with React and Flask or Hapi'},
  {item: 'apply to job'}
]

let todos = data.map((datum) => Todo(datum))
todos.forEach((todo) => {
  todo.save((err) => {
    if (err) throw err
    console.log(`item "${todo.item}" saved`)
  })
})

const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

  app.get('/todo', (req, res) => {
    res.render('todo', { todos: data })
  })

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push(req.body)
    res.json(data)
  })

  app.delete('/todo/:item', (req, res) => {
    data = data.filter((todo) => todo.item.replace(/ /g, '-') !== req.params.item)
    res.json(data)
  })
}