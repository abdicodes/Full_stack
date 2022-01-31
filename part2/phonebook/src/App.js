import React, { useState, useRef } from "react";
const isContact = (array, name, number) => {
  //this functions iterates through the App state "persons" and checks if the name matches with string "name"
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
const searching = (char, array) => {
  if (char) {
    const a = [];
    array.forEach((element) => {
      // console.log(element);

      // if (JSON.stringify(element).includes(JSON.stringify(char))) {
      //   a.push(JSON.stringify(element));
      if (element.name.includes(char)) {
        a.push(element);
        console.log(a);
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

  const filterHandler = (event) => {
    const char = event.target.value;

    setFiltered(searching(char, persons));
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
    setFiltered(persons);
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
      <form>
        <div id="filter">
          filter shown with <input onChange={filterHandler} />
        </div>
      </form>
      <h2>Add a new</h2>

      <form>
        <div>
          name: <input value={newName} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberInputHandler} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered.map((e, i) => (
          <div key={i}>
            {e.name} {e.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
