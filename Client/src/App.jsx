import React from "react";
import { useState } from 'react'
import EditTodoForm from "./components/EditTodoForm";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import MyInput from './components/UI/Input/MyInput'
import MyModal from "./components/UI/MyModal/MyModal";
import './styles/App.css'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, date: '2018-07-22', text: 'Нужно написать код', completed: false},
    {id: 2, date: '2018-07-21', text: 'Нужно исправить код', completed: false},
    {id: 3, date: '2018-07-25', text: 'Нужно написать ', completed: true} 
  ])
  const [visible, setVisible] = useState(false)
  const [oldTodo, setOldTodo] = useState({})

  // Добавить дело в список
  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo])
  }

  // Отредактировать дело
  const editTodo = (todo) => {
    setOldTodo(todo)
    setVisible(true)
  }

  // Сохранить отредактированное дело
  const saveEditedTodo = (newTodo) => {
    setTodos(
    //   todos.splice(todos.find(t => t.id == newTodo.id).id, 1, newTodo)
    //   return todos
    // }
      todos.map((todo) => {
        if (todo.id === newTodo.id) {
          return newTodo
        }
        return todo
      })
    )
    setOldTodo({})
    setVisible(false)
  }


  // Удалить дело из списка
  const removeTodo = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id))
  }

  return (
    <div className='App'>
      <MyModal visible={visible} setVisible={setVisible}>
        <EditTodoForm oldTodo={oldTodo} saveEditedTodo={saveEditedTodo} setOldTodo={setOldTodo} setVisible={setVisible} />
      </MyModal>
      <TodoForm create={createTodo}>Добавить</TodoForm>
      <MyInput>Найти дело</MyInput>
      {
        todos.length
          ? <TodoList remove={removeTodo} edit={editTodo} todos={todos} setTodos={setTodos}>Список дел:</TodoList>
          : <h1 style={{textAlign: 'center', color: '#00008b'}}>Список дел пуст</h1>
      }
      <div className='pagination'>тут будет пагинация</div>
    </div>
  );
};

export default App;
