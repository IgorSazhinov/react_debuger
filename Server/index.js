const express = require('express')
const cors = require('cors')
const PORT = 7000
const app = express()

app.use(cors())
app.use(express.json())

let todos = [
    {id: 1, date: '1987-07-08', text: 'Сервер запущен', completed: true},
  ]

app.get('/todos/', (req, res) => {
    res.status(200).json(todos)
    console.log(todos, 'get')
})

app.post('/todos/', (req, res) => {
    todos = req.body.date
    res.status(200).json(todos.body)
    console.log(todos, 'post')
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
