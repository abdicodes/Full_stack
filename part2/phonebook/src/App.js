import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [filtered, setFiltered] = useState(persons);
  useEffect(() => {
    setFiltered(persons);
  }, [persons]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
