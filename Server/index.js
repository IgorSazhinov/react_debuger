const express = require('express')
const cors = require('cors')

const PORT = 7000

const app = express()
app.use(cors())
app.use(express.json())


let todos = [
    {id: 1, date: '2018-07-22', text: 'Нужно написать код', completed: false},
    {id: 2, date: '2018-07-21', text: 'Нужно исправить код', completed: false},
    {id: 3, date: '2018-07-25', text: 'Нужно написать код ещё раз', completed: true} 
  ]

app.get('/todos/', (req, res) => {
    res.status(200).json(todos)
})

app.post('/todos/', (req, res) => {
    todos = req.body.date
    res.status(200).json(todos.body)
})



const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
