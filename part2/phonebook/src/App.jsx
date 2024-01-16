import { useState, useEffect } from 'react'
import Person from './Person.jsx'
import axios from 'axios'
import personService from './services/person'
import PersonForm from './PersonForm.jsx'
import Filter from './Filter.jsx'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
  })}, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName}? is already added to phonebook, replace the old number with a new one?`)) {
        const personId = persons.find(person => person.name === newName).id
        const person = persons.find(person => person.id === personId)
        const changedPerson = {...person, number: newNumber}
        console.log(personId)
        personService.update(personId, changedPerson).then(response => {
          setNotification(
            `'${newName}''s number was changed successfully`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== personId? person : response.data)),
          setNewName(''),
          setNewNumber('')
        })
      }
    } else {
      personService.create(personObject).then(response => {
        setNotification(
          `'${newName}' was added successfully`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.concat(personObject)),
        setNewName(''),
        setNewNumber('')
      })
    }
  }

  const deletePerson = person => {
    const id = person.id
    console.log(id)
    if (window.confirm(`Delete ${person.name}?`)) {
      const temp = person.name
      personService.deleteF(id).then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
      personService.getAll().then(response => {
        setPersons(response);
      })
      setNotification(
        `'${temp}' was deleted successfully`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const NotificationMessage = ({ message }) => {
    const noficationStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message === null) {
      return null
    }

    return (
      <div style={noficationStyle}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={newNotification} />
      <div>
        <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      </div>
      <PersonForm newName = {newName} handleNameChange = {handleNameChange} newNumber= {newNumber} 
      handleNumberChange = {handleNumberChange} addPerson = {addPerson} />
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} person={person} filter={newFilter} deletePerson = {() => deletePerson(person)}/>
      )}
    </div>
  )
}

export default App