// Placeholder data
let data = [
  {item: 'practice Node.js'},
  {item: 'enable Babel and ES6 in Node'},
  {item: 'learn Postgres'},
  {item: 'learn Hapi?'},
  {item: 'build app with React and Flask or Node/Hapi'},
  {item: 'apply to job'}
]

const bodyParser = require('body-parser')
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