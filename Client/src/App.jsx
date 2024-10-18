import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from 'react'
import EditTodoForm from "./components/EditTodoForm";
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import MyInput from './components/UI/Input/MyInput'
import MyModal from "./components/UI/MyModal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import MyTitle from "./components/UI/title/MyTitle";
import useDateNow from "./hooks/useDateNow";
import './styles/App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [visible, setVisible] = useState(false)
  const [oldTodo, setOldTodo] = useState({id: null, date: '', text: '', completed: false})
  const [selectedSort, setSelectedSort] = useState('date')
  const [searchQuery, setSearchQuery] = useState('')


  // первая отрисовка при загрузке страницы
  useEffect(() => {
    fetchTodo()
  }, [])

  // фетч запрос на сервер
  async function fetchTodo() {
    const response = await axios.get('http://localhost:7000/')
    setTodos(response.data)
  }

  

  /** 
   * Выбор типа сортировки
   * @param {string} selectedSort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
   * @description для 'text' и 'date' используем метод localeCompare(); для 'today' фильтруем с помощью кастомного метода useDateNow(); для 'completed' фильтруем по обратному параметру completed
   * @return возвращаем тип сортировки. Далее эта функция будет вызвана в sortedTodos
  */
  const selectSortType = () => {
    if (selectedSort === 'text' || selectedSort === 'date') {
      return [...todos].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    if (selectedSort === 'today') {
      return todos.filter(t => t.date === useDateNow())
    }
    if (selectedSort === 'completed') {
      return todos.filter(t => !t.completed)
    }
  }

  /** 
   * Выполняем сортировку
   * @param {string} selectedSort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
   * @description выполняем проверку на случай незаданного типа сортировки. Выполняем сортировку обернутую в useMemo
   * @dependency selectedSort - отслеживаем изменение типа сортировки
   * @dependency todos - отслеживаем изменение массива со списком дел
   * @dependency visible - отслеживаем появление скрытие модалки редактирования дела
   * @dependency oldTodo - отслеживаем изменения отредактированого дела
   * @return возвращаем отсортированный массив. Далее отдадам его в функцию sortedAndSearchedTodo
   */
  const sortedTodos = useMemo(() => {
    if (selectedSort) {
      return selectSortType()
    }
    return todos
  }, [selectedSort, todos, visible, oldTodo])

  /** 
   * Выполняем поис + сортировку
   * @param {object} sortedTodos - отсортированное дело.
   * @param {string} searchQuery - состояние строки поиска.
   * @description отсортированный список фильтруем по строке поиска. всё обёрнуто в useMemo.
   * @dependency searchQuery - отслеживаем изменение в поле поиска
   * @dependency sortedTodos - отслеживаем изменение сортировки списка дел
   * @dependency visible - отслеживаем появление скрытие модалки редактирования дела
   * @dependency oldTodo - отслеживаем изменения отредактированого дела
   * @return возвращаем отсортированный и отфильтрованный массив. Далее отдадим его в компонент TodoList
   */
  const sortedAndSearchedTodo = useMemo(() => {
    return sortedTodos.filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedTodos, visible, oldTodo])

  /** 
   * Меняем тип сортировки
   * @param {string} sort - тип выбранной сортировки из компонента MySelect
   * @description меняю состояние selectedSort. Далее это будет передано 
   */
  const sortTodos = (sort) => {
    setSelectedSort(sort)
  }

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
   * @param {object} todo - дело после того как его отредактировали
   * @description помещаю в состояние todos новый массив с измененным делом. Очищаю oldTodo. Закрываю модалку.
   */ 
  const saveEditedTodo = (todo) => {
    setTodos(() => {
      const i = todos.findIndex(el => el.id === todo.id)
      todos[i] = todo
      return todos
    })
    setOldTodo({id: null, date: '', text: '', completed: false})
    setVisible(false)
  }

  /** Удалить дело из списка
   * @param {object} todo - дело по которому сработало событие удаления
   * @description помещаю в состояние todos отфильтрованный массив без указанного дела
   */
  const removeTodo = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id))
  }


  /** Изменение состояния выполненного дела из списка
   * @param {object} todo - дело по которому сработало событие изменения состояния completed
   * @param {object} checkIn - состояние completed до изменения
   * @description помещаю в состояние todos с выполненным или невыполенным делом
   */
  const editComlitedTodo = (todo, checkIn) => {
    setTodos(() => {
      const i = todos.findIndex(el => el.id === todo.id)
      todos[i] = {...todo, completed: !checkIn}
      return todos
    })
    setOldTodo({id: null, date: '', text: '', completed: false})
  }

  return (
    <div className='App'>
      <MyModal visible={visible} setVisible={setVisible}>
        <EditTodoForm oldTodo={oldTodo} saveEditedTodo={saveEditedTodo} setOldTodo={setOldTodo} setVisible={setVisible} />
      </MyModal>
      <TodoForm create={createTodo}>Добавить</TodoForm>
      <div style={{display: 'flex', marginTop: '5px'}}>
        <MyInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)}>Найти дело</MyInput> 
        <MySelect
          defaultValue='Сортировка по'
          options={[
            {value: 'date', name: 'Дате'},
            {value: 'text', name: 'Названию'},
            {value: 'today', name: 'Только за сегодня'},
            {value: 'completed', name: 'Невыполненные'}
          ]}
          value={selectedSort}
          onChange={sortTodos}
        />
      </div>
      {
        sortedAndSearchedTodo.length
          ? <TodoList remove={removeTodo} edit={editTodo} todos={sortedAndSearchedTodo} setTodos={setTodos} editComlitedTodo={editComlitedTodo}/>
          : <MyTitle>Список дел пуст</MyTitle>
      }
      <div className='pagination'></div>
    </div>
  );
};

export default App;