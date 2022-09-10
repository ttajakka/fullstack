import axios from 'axios'
import { useEffect, useState } from 'react'

import './index.css'
import personService from './services/persons'


const FilterInput = ({ filter, handler }) =>
  <div>
    Show names containing <input value={filter} onChange={handler}></input>
  </div>

const AddPerson = ({ handleSubmit, name, handleName, number, handleNum }) =>
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleName}/>
    </div>
    <div>
      number: <input value={number} onChange={handleNum}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const ShowPerson = ({ person, handleRemove }) => 
  <div>
    {person.name} {person.number} <button onClick={handleRemove}>delete</button>
  </div>

const ShowPersonList = ({ persons, filter, removeHandler }) =>
  persons.filter(person => 
    person.name
    .toLowerCase()
    .includes(filter.toLowerCase())
  ).map(person => 
    <ShowPerson 
      key={person.id}
      person={person}
      handleRemove={() => removeHandler(person)}
    />
  )

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [succMes, setSuccMes] = useState(null)
  const [errorMes, setErrorMes] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleRemoveOf = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          personService
          .getAll()
          .then(updatedPersons => {
            setPersons(updatedPersons)
          })
        })
    }
  }


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const id = persons.find(person => person.name === newName).id
      const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(confirmMessage)) {
        const newPerson = { name: newName, number: newNumber }
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            if (error.response.status === 400) {
              setErrorMes(error.response.data.error)
              setTimeout(() => { setErrorMes(null) }, 5000)
            } else {
              setErrorMes(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => { setErrorMes(null) }, 5000)
              setPersons(persons.filter(person => person.name !== newName))
            }
          })
      } else { return }
    } else {
      const newPerson = { name : newName, number : newNumber }
      
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccMes(`Added ${returnedPerson.name}`)
          setTimeout(() => { setSuccMes(null) }, 5000)
        })
        .catch(error => {
          setErrorMes(error.response.data.error)
          setTimeout(() => { setErrorMes(null) }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={succMes}/>
      <ErrorMessage message={errorMes}/>
      <FilterInput filter={filter} handler={handleFilterChange}/>
      <h3>add new</h3>
      <AddPerson 
        handleSubmit={addPerson}
        name={newName} 
        handleName={handleNameChange}
        number={newNumber}
        handleNum={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ShowPersonList 
        persons={persons} 
        filter={filter}
        removeHandler={handleRemoveOf} />
    </div>
  )

}

export default App