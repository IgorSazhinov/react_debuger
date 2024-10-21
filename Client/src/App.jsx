import React from "react";
import { useState } from "react";
import EditTodoForm from "./components/EditTodoForm";
import TodoFilter from "./components/TodoFilter";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import MyModal from "./components/UI/MyModal/MyModal";
import { useGetTodo, useSendTodo } from "./hooks/useGetAndSendTodo";
import { useSortedAndSearchedTodo } from "./hooks/useSortedAndSearchedTodo";
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [visible, setVisible] = useState(false)
  const [oldTodo, setOldTodo] = useState({id: null, date: '', text: '', completed: false})
  const [changedTodo, setChangedTodo] = useState(false)
  const [filter, setFilter] = useState({sort: 'date', query: ''})
  const [connectionCompleted, setConnectionCompleted] = useState(false)
  const sortedAndSearchedTodo = useSortedAndSearchedTodo(filter.query, filter.sort, todos, changedTodo)
  
  useGetTodo(setConnectionCompleted, setTodos)
  useSendTodo(connectionCompleted, changedTodo, setChangedTodo, setConnectionCompleted, todos)

  console.log('список дел изменилось?',todos)

  /** 
   * Добавить новое дело в список
   * @param {object} newTodo - новое дело из формы
   * @description Проверка на то что есть подключение. Помещаю в состояние todos новый массив из старого массива и нового дела
   */
  const createTodo = (newTodo) => {
    if (connectionCompleted) {
      setTodos([...todos, newTodo])
      setChangedTodo(true)
    }
  }

  /** 
   * Отредактировать дело
   * @param {object} todo - дело из списка, по которому сработало событие для редактирования
   * @description Проверка на то что есть подключение. Помещаю в состояние oldTodo дело для редактирования и отображаю модалку с редактором дела
   */
  const editTodo = (todo) => {
    if (connectionCompleted) {
      setOldTodo(todo)
      setVisible(true)
    }
  }

  /** 
   * Сохранить отредактированное дело
   * @param {object} todo - дело после того как его отредактировали
   * @description Проверка на то что есть подключение. Помещаю в состояние todos новый массив с измененным делом. Очищаю oldTodo. Закрываю модалку.
   */ 
  const saveEditedTodo = (todo) => {
    
    if (connectionCompleted) {
      setTodos(() => {
        const i = todos.findIndex(el => el.id === todo.id)
        todos[i] = todo
        return todos
      })
      setChangedTodo(true)
      setOldTodo({id: null, date: '', text: '', completed: false})
      setVisible(false)
    }
  }

  /** Удалить дело из списка
   * @param {object} todo - дело по которому сработало событие удаления
   * @description Проверка на то что есть подключение. Помещаю в состояние todos отфильтрованный массив без указанного дела
   */
  const removeTodo = (todo) => {
    if (connectionCompleted) {
      setTodos(todos.filter(t => t.id !== todo.id))
      setChangedTodo(true)
    }
  }

  /** Изменение состояния выполненного дела из списка
   * @param {object} todo - дело по которому сработало событие изменения состояния completed
   * @param {object} checkIn - состояние completed до изменения
   * @description Проверка на то что есть подключение. Помещаю в состояние todos с выполненным или невыполенным делом
   */
  const editComlitedTodo = (todo, checkIn) => {
    if (connectionCompleted) {
      setTodos(() => {
        const i = todos.findIndex(el => el.id === todo.id)
        todos[i] = {...todo, completed: !checkIn}
        return todos
      })
      setChangedTodo(true)
      setOldTodo({id: null, date: '', text: '', completed: false})
    }
  }

  return (
    <div className='App'>
      <MyModal visible={visible} setVisible={setVisible}>
        <EditTodoForm
          oldTodo={oldTodo}
          saveEditedTodo={saveEditedTodo}
          setOldTodo={setOldTodo}
          setVisible={setVisible}
        />
      </MyModal>
      <TodoForm create={createTodo} />
      <TodoFilter filter={filter} setFilter={setFilter}/>
      <TodoList 
        remove={removeTodo}
        edit={editTodo}
        sortedAndSearchedTodo={sortedAndSearchedTodo}
        setTodos={setTodos}
        editComlitedTodo={editComlitedTodo}
        connectionCompleted={connectionCompleted}
      />
    </div>
  );
};

export default App;