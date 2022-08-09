const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('DB CONNECTED'))
.catch(e => console.log(e))

// Importing models
const Todo = require('./models/todo')

app.get('/api', (req, res) => {
    return res.status(200).json({ message: 'API is good!' })
})

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        return res.status(200).json(todos)
    } catch (e) {
        return res.status(400).json({ message: 'Unable fetch todos' })
    }
})

app.get('/api/todos/:todoId', async (req, res) => {
    try {
        const id = req.params.todoId
        const todo = await Todo.findById(id)
        return res.status(200).json(todo)
    } catch (e) {
        return res.status(404).json({ message: 'Unable fetch todo' })
    }
})

app.post('/api/todos', (req, res) => {
    try {
        const todo = new Todo(req.body)
        todo.save()
        return res.status(200).json({ message: 'Todo Created!', todo: todo })
    } catch (e) {
        return res.status(400).json({ message: 'Unable to save todo' })
    }
})

app.delete('/api/todos/:todoId', async (req, res) => {
    try {
        const id = req.params.todoId

        // One way
        const todo = await Todo.findById(id)
        todo.delete()

        return res.status(200).json(todo)
    } catch (e) {
        return res.status(404).json({ message: 'Unable fetch todo' })
    }
})

app.put('/api/todos/:todoId', async (req, res) => {
    try {
        const id = req.params.todoId
        const todo = await Todo.findById(id)
        
        todo.task = req.body.task
        todo.isCompleted = req.body.isCompleted

        todo.save()

        return res.status(200).json(todo)
    } catch (e) {
        return res.status(404).json({ message: 'Unable fetch todo' })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT ${port}`)
})