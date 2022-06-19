require('dotenv').config()
require('./mongo')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const uuid = require('node-uuid')
const routes = require('./routes')
const app = express()
// Ejemplo de uso de middleware
/* const logger = require('./middlewares/logger') */

morgan.token('id', function getId (req) {
  return req.id
})

morgan.token('body', (req) => JSON.stringify(req.body))

function assignId (req, res, next) {
  req.id = uuid.v4()
  next()
}

app.use(bodyParser.json())
app.use(cors())
app.use(assignId)

app.use(
  morgan(
    ':id :method :url :status :res[content-length] - :response-time body: :body '
  )
)

// Ejemplo de uso de Middleware
/* app.use(logger) */

app.get('/', (req, res) => {
  res.send('<h2> Hello World </h2>')
})

app.use('/api', routes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  console.log(`http://localhost:${PORT}/api/persons`)
  console.log(`http://localhost:${PORT}/api/info`)
})
