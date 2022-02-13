const e = require("express");
const express = require("express");
const app = express();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  const note = notes.find((note) => note.id === Number(id));

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
app.get("/info", (req, res) => {
  const date = new Date();
  const entries = persons.length;
  res.send(`<h3>Phonebook has info for ${entries} people <br> ${date}</h3>`);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);
  console.log(person);
  if (person) {
    res.json(person);
    console.log("OK");
  } else {
    res.status(404).end();
    console.log("not OK");
  }
});
app.delete("/api/persons/:id", (req, res) => {
  id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const id = Math.round(Math.random() * 1000000);
  contact = req.body;
  if (persons.find((person) => person.name === contact.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  console.log(contact);
  if (contact.name && contact.number) {
    const person = {
      name: contact.name,
      number: contact.number,
      id: id,
    };
    console.log(person);
    persons = persons.concat(person);
    console.log(persons);
    res.json(person);
  } else {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
