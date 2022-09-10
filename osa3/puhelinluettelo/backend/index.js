require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('req-body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :req-body'))


// define database object
const Person = require('./models/person')

/*
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456",
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345",
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
  },
  {
    "id": 5,
    "name": "Alexander Grothendieck",
    "number": "+1-206-9546075",
  },
]
*/


app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/info', (req, res) => {
  //const numOfPersons = persons.length
  //const numOfPersons =
  //const date = new Date()
  //res.send(`<p>Phonebook has info for ${numOfPersons} people</p>
  //<p>${date}</p>`)
  Person.find({}).then(persons => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${date}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  //const id = Number(req.params.id)
  //const person = persons.find(p => p.id === id)
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  //if (person) {
  //  res.json(person)
  //} else {
  //  res.status(404).end()
  //}
})


app.post('/api/persons', (req, res, next) => {
  const person = req.body

  //if (!person.name) {
  //  return res.status(400).json({ error: 'You must provide a name' })
  //}

  //f (!person.number) {
  //  return res.status(400).json({ error: 'You must provide a number' })
  //}

  //if (persons.find(p => p.name === person.name)) {
  //  return res.status(400).json({
  //    error: 'Person with this name already exists'
  //  })
  //}

  //const ID_RANGE = 1000000000
  //const newId = Math.floor(Math.random()*ID_RANGE)
  //person.id = newId

  //persons = persons.concat(person)

  //res.json(person)

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  //const id = Number(req.params.id)
  //persons = persons.filter(p => p.id !== id)

  //res.status(204).end()

  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Morjesta, server running on port ${PORT}`)
})