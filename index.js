const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [{
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
}, {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
}, {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
}, {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
}, ]

const generateId = () => {
    return Math.floor(Math.random() * 1000000);
}

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1>\n<p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(person => person.id === id)

    if (person)
        res.json(person)
    else
        res.status(404).end()
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    console.log("req body = ", req.body)

    if (!body.name || !body.number || nameExists(body.name)) {

        const errMsg = !body.name || !body.number ? "content missing" : 'name must be unique'

        return res.status(400).json({
            error: errMsg
        })

    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

const nameExists = (name) => {
    return persons.find(person => person.name === name)
}

const PORT = 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)