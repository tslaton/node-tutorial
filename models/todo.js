// Third-party
const mongoose = require('mongoose')

// Create data schema
const todoSchema = new mongoose.Schema({
  item: String,
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo