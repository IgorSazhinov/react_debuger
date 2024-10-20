import { useEffect } from "react"
import axios from "axios";


// запрос на сервер
async function fetchTodo(setConnectionCompleted, setTodos) {
    await axios.get('http://localhost:7000/todos/').then((response) => {
        setConnectionCompleted(true)
        setTodos(response.data)
    }).catch((e) => {
        console.error(e)
        setConnectionCompleted(false)
    })
}
export const useGetTodo = (setConnectionCompleted, setTodos) => {
        useEffect(() => {
            console.log('первичная загрузка')
            fetchTodo(setConnectionCompleted, setTodos)
        }, [])
}

async function pushTodo(setConnectionCompleted, todos) {
    await axios.post('http://localhost:7000/todos/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        date: todos
    }).then(() => {
        setConnectionCompleted(true)
    }).catch((e) => {
        console.error(e)
        setConnectionCompleted(false)
    })
}

export const useSendTodo = (connectionCompleted, changedTodo, setChangedTodo, setConnectionCompleted, todos) => {
    useEffect(() => {
    if (connectionCompleted && changedTodo) {
      console.log('отправка на сервер')
      pushTodo(setConnectionCompleted, todos)
      setChangedTodo(false)
    }}, [changedTodo])
}
