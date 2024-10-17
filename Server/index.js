const express = require('express')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors())
app.use(express.json())


let todo = [
    {id: 1, date: '2018-07-22', text: '3Нужно написать код', completed: false},
    {id: 2, date: '2018-07-21', text: '2Нужно исправить код', completed: false},
    {id: 3, date: '2018-07-25', text: '1Нужно написать ', completed: true} 
  ]

app.get('/', (req, res) => {
    res.status(200).json(todo)
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
