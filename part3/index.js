const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
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
app.use(cors());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(express.json());
app.use(requestLogger);
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  const note = notes.find((note) => note.id === Number(id));

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const updatedNote = {
    id: Number(id),
    content: body.content,
    date: body.date,
    important: body.important,
  };

  notes = notes.map((note) =>
    note.id !== updatedNote.id ? note : updatedNote
  );
  console.log(updatedNote);
  console.log(notes);

  response.json(updatedNote);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const entries = persons.length;
  res.send(`<h3>Phonebook has info for ${entries} people <br> ${date}</h3>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
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
  if (!contact.number || !contact.name) {
    return res.status(400).json({ error: "name or number is missing" });
  }
  if (persons.find((person) => person.name === contact.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (contact.name && contact.number) {
    const person = {
      name: contact.name,
      number: contact.number,
      id: id,
    };

    persons = persons.concat(person);

    res.json(person);
  } else {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
