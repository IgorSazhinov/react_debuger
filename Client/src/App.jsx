import React from "react";
import { useState } from 'react'
import EditTodoForm from "./components/EditTodoForm";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import MyInput from './components/UI/Input/MyInput'
import MyModal from "./components/UI/MyModal/MyModal";
import MyTitle from "./components/UI/title/MyTitle";
import './styles/App.css'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, date: '2018-07-22', text: 'Нужно написать код', completed: false},
    {id: 2, date: '2018-07-21', text: 'Нужно исправить код', completed: false},
    {id: 3, date: '2018-07-25', text: 'Нужно написать ', completed: true} 
  ])
  const [visible, setVisible] = useState(false)
  const [oldTodo, setOldTodo] = useState({})

  /** 
   * Добавить новое дело в список
   * @param {object} newTodo - новое дело из формы
   * @description помещаю в состояние todos новый массив из старого массива и нового дела
   */
  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo])
  }

  /** 
   * Отредактировать дело
   * @param {object} todo - дело из списка, по которому сработало событие для редактирования
   * @description помещаю в состояние oldTodo дело для редактирования и отображаю модалку с редактором дела
   */
  const editTodo = (todo) => {
    setOldTodo(todo)
    setVisible(true)
  }

  /** 
   * Сохранить отредактированное дело
   * @param {object} newTodo - новое дело после того как его отредактировали
   * @description помещаю в состояние todos новый массив с измененным делом. Очищаю oldTodo. Закрываю модалку.
   */ 
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

  /** Удалить дело из списка
   * @param {object} todo - дело по которому сработало событие удаления
   * @description помещаю в состояние todos отфильтрованный массив без указанного дела
   */
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
          ? <TodoList remove={removeTodo} edit={editTodo} todos={todos} setTodos={setTodos} />
          : <MyTitle>Список дел пуст</MyTitle>
      }
      <div className='pagination'>тут будет пагинация</div>
    </div>
  );
};

export default App;
