// Third-party
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Connect to mongodb
const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
mongoose.connect(`mongodb://${db_user}:${db_pass}@${db_host}`)

// Create data schema
const todoSchema = new mongoose.Schema({
  item: String,
})

const Todo = mongoose.model('Todo', todoSchema)

const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

  app.get('/todo', (req, res) => {
    // Get data from mongodb
    Todo.find({}, (err, data) => {
      if (err) throw err
      // Render view with data
      res.render('todo', { todos: data })
    })
  })

  app.post('/todo', urlencodedParser, (req, res) => {
    // Get data from view and save to mongodb
    const todo = Todo(req.body).save((err, data) => {
      if (err) throw err
      // Pass updated data back to view
      res.json(data)
    })
  })

  app.delete('/todo/:item', (req, res) => {
    // Delete requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove((err, data) => {
      if (err) throw err
      // Pass updated data back to view
      res.json(data)
    })
  })
}