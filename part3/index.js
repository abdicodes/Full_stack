require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/persons')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body'))

app.get('/info', (req, res, next) => {
  const date = new Date()
  Person.find({})
    .then((result) =>
      res.send(
        `<h3>Phonebook has info for ${result.length} people <br> ${date}</h3>`
      )
    )
    .catch((err) => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.number || !req.body.name) {
    return res.status(400).json({ error: 'name or number is missing' })
  }
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })
  person
    .save()
    .then((savedContact) => res.json(savedContact))
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result)
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      res.json(result)
      console.log(result)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
