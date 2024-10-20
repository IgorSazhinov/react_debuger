import axios from "axios";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import EditTodoForm from "./components/EditTodoForm";
import TodoFilter from "./components/TodoFilter";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import MyInput from './components/UI/Input/MyInput';
import MyModal from "./components/UI/MyModal/MyModal";
import MySelect from "./components/UI/select/MySelect";
import MyTitle from "./components/UI/title/MyTitle";
import useDateNow from "./hooks/useDateNow";
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [visible, setVisible] = useState(false)
  const [oldTodo, setOldTodo] = useState({id: null, date: '', text: '', completed: false})
  const [changedTodo, setChangedTodo] = useState(false)
  const [filter, setFilter] = useState({sort: 'date', query: ''})
  const [connectionCompleted, setConnectionCompleted] = useState(false)
  

  // console.log('Дело изменилось?',changedTodo)
  console.log('список дел изменилось?',todos)
  // console.log('проверка подключения',connectionCompleted)


  // первая отрисовка при загрузке страницы
  useEffect(() => {
    console.log('первичная загрузка')
    fetchTodo()
  }, [])

  useEffect(() => {
    if (connectionCompleted && changedTodo) {
      console.log('отправка на сервер')
      pushTodo()
      setChangedTodo(false)
    }
  }, [changedTodo])

  // запрос на сервер
  async function fetchTodo() {
    await axios.get('http://localhost:7000/todos/').then((response) => {
      setConnectionCompleted(true)
      setTodos(response.data)
    }).catch((e) => {
      console.error(e)
      setConnectionCompleted(false)
    })
  }

  // отправка на сервер
  async function pushTodo() {
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

  
  /** 
   * Выбор типа сортировки
   * @param {string} filter.sort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
   * @description для 'text' и 'date' используем метод localeCompare(); для 'today' фильтруем с помощью кастомного метода useDateNow(); для 'completed' фильтруем по обратному параметру completed
   * @return возвращаем тип сортировки. Далее эта функция будет вызвана в sortedTodos
  */
  const selectSortType = () => {
    if (filter.sort === 'text' || filter.sort === 'date') {
      return [...todos].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    if (filter.sort === 'today') {
      return todos.filter(t => t.date === useDateNow())
    }
    if (filter.sort === 'completed') {
      return todos.filter(t => !t.completed)
    }
  }

  /** 
   * Выполняем сортировку
   * @param {string} filter.sort - состояния последней выбранной сортировки. может принимать: 'text' - описание дела; 'date' - срок выполнения дела; 'today' - срок сегодня; 'completed' - выполнено или нет.
   * @description выполняем проверку на случай незаданного типа сортировки. Выполняем сортировку обернутую в useMemo
   * @dependency filter.sort - отслеживаем изменение типа сортировки
   * @dependency todos - отслеживаем изменение массива со списком дел
   * @dependency oldTodo - отслеживаем изменения отредактированого дела
   * @return возвращаем отсортированный массив. Далее отдадам его в функцию sortedAndSearchedTodo
   */
  const sortedTodos = useMemo(() => {
    if (filter.sort) {
      return selectSortType()
    }
    return todos
  }, [filter.sort, todos, changedTodo])

  /** 
   * Выполняем поиск после сортировки
   * @param {object} sortedTodos - отсортированное дело.
   * @param {string} filter.query - состояние строки поиска.
   * @description отсортированный список фильтруем по строке поиска. всё обёрнуто в useMemo.
   * @dependency filter.query - отслеживаем изменение в поле поиска
   * @dependency sortedTodos - отслеживаем изменение сортировки списка дел
   * @dependency oldTodo - отслеживаем изменения отредактированого дела
   * @return возвращаем отсортированный и отфильтрованный массив. Далее отдадим его в компонент TodoList
   */
  const sortedAndSearchedTodo = useMemo(() => {
    return sortedTodos.filter(todo => todo.text.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedTodos, changedTodo])

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
      {
        visible
          ? <MyModal visible={visible} setVisible={setVisible}>
              <EditTodoForm oldTodo={oldTodo} saveEditedTodo={saveEditedTodo} setOldTodo={setOldTodo} setVisible={setVisible} />
            </MyModal>
          : <></>
      }
      <TodoForm create={createTodo} />
      <TodoFilter filter={filter} setFilter={setFilter}/>
      {
        connectionCompleted ? (
          (sortedAndSearchedTodo.length) ? (
               <TodoList remove={removeTodo} edit={editTodo} todos={sortedAndSearchedTodo} setTodos={setTodos} editComlitedTodo={editComlitedTodo}/>
              ) : (
                <MyTitle>Список дел пуст</MyTitle>
              )
        ) : (
          <MyTitle>Идет загрузка с сервера...</MyTitle>
        )
      }
    </div>
  );
};

export default App;