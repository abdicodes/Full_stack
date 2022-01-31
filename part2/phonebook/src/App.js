import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
//this functions iterates through the App state "persons" and checks if the name matches with string "name"
const isContact = (array, name, number) => {
  if (
    array.find(
      (e) =>
        JSON.stringify(e) ===
        JSON.stringify({ name: name, number: number, id: array.length })
    )
  ) {
    return true;
  } else {
    return false;
  }
};

// this function will take an array and string characters as inputs. string is coming from user input against elements
const Searching = (char, array) => {
  if (char) {
    const a = [];
    array.forEach((element) => {
      if (element.name.toLowerCase().includes(char.toLowerCase())) {
        a.push(element);
      }
    });
    return a;
  }
  return array;
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [filtered, setFiltered] = useState(persons);
  useEffect(() => {
    setFiltered(persons);
  }, [persons]);

  const filterHandler = (event) => {
    const char = event.target.value;
    setFiltered(Searching(char, persons));
  };

  const addPerson = (event) => {
    //adds a person if the string is not empty and uses isContact function to check if name in newName exist
    event.preventDefault();
    if (newName === "") return;

    isContact(persons, newName, newNumber)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          })
        );
    setNewName("");
    setnewNumber("");
  };
  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };
  const numberInputHandler = (e) => {
    setnewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons contacts={filtered} />
    </div>
  );
};

export default App;
