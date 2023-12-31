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

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
  })}, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      console.log(newName)
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService.create(personObject).then(response => {
        setPersons(persons.concat(personObject)),
        setNewName(''),
        setNewNumber('')
      })
    }
  }

  const deletePerson = person => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteF(id).then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
      personService.getAll().then(response => {
        setPersons(response);
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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