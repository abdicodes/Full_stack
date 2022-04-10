import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import backEndLogic from './backEndLogic'
import Notification from './Notification'
//this functions iterates through the App state "persons" and checks if the name matches with string "name"
const isContact = (array, name) => {
  return array.find((e) => e.name === name)
}

// this function will take an array and string characters as inputs. string is coming from user input against elements
const Searching = (char, array) => {
  if (char) {
    const a = []
    array.forEach((element) => {
      if (element.name.toLowerCase().includes(char.toLowerCase())) {
        a.push(element)
      }
    })
    return a
  }
  return array
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)
  useEffect(() => {
    setFiltered(persons)
  }, [persons])
  useEffect(() => {
    backEndLogic.getAll().then((res) => setPersons(res))
  }, [])

  const filterHandler = (event) => {
    const char = event.target.value
    setFiltered(Searching(char, persons))
  }

  const addPerson = (event) => {
    //adds a person if the string is not empty and uses isContact function to check if name in newName exist
    event.preventDefault()

    //logic to check if the name already exists and use PUT to modify.
    if (newName === '') return
    const existingContact = isContact(persons, newName)
    if (existingContact) {
      if (
        window.confirm(
          `${newName} already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        backEndLogic
          .modify(existingContact.id, {
            ...existingContact,
            number: newNumber,
          })
          .then((updatedContact) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedContact.id ? updatedContact : person
              )
            )
            console.log(persons)
            setNewName('')
            setnewNumber('')
            setConfirmMessage(`Contact has succesfully been updated`)
            setTimeout(() => {
              setConfirmMessage(null)
            }, 4000)
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error)
            setNewName('')
            setnewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
          })
      }
      // logic to add a new contact using POST
    } else {
      backEndLogic
        .create({
          name: newName,
          number: newNumber,
        })
        .then((res) => {
          setPersons(persons.concat(res))
          setNewName('')
          setnewNumber('')
          setConfirmMessage(`Contact has succesfully been added`)
          setTimeout(() => {
            setConfirmMessage(null)
          }, 4000)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setNewName('')
          setnewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
    }
  }
  const nameInputHandler = (e) => {
    setNewName(e.target.value)
  }
  const numberInputHandler = (e) => {
    setnewNumber(e.target.value)
  }
  const errorMessageHandler = (e) => {
    try {
      backEndLogic(e)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteHandler = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name} ?`)) {
      return
    }
    backEndLogic
      .deleteContact(id)
      .then((res) => {
        setPersons(persons.filter((person) => person.id !== res.id))
        setConfirmMessage(`${name} has succesfully been removed`)
        setTimeout(() => {
          setConfirmMessage(null)
        }, 4000)
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(
          `information on ${name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        color="red"
        errorHandler={errorMessageHandler}
      />
      <Notification message={confirmMessage} color="green" />
      <Filter handler={filterHandler} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        nameHandler={nameInputHandler}
        numberHandler={numberInputHandler}
        adder={addPerson}
      />
      <h2>Numbers</h2>
      <Persons contacts={filtered} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
