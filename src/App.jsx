import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import MyInput from './components/UI/Input/MyInput'
import './styles/App.css'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, date: '2018-07-22', text: 'Нужно написать код', completed: false},
    {id: 2, date: '2018-07-21', text: 'Нужно исправить код', completed: false},
    {id: 3, date: '2018-07-25', text: 'Нужно написать ', completed: true} 
  ])

  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo])
  }

  const removeTodo = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id))
  }

  return (
    <div className='App'>
      <TodoForm create={createTodo}/>
      <MyInput>Найти дело</MyInput>
      {
        todos.length
          ? <TodoList remove={removeTodo} todos={todos}>Список дел:</TodoList>
          : <h1 style={{textAlign: 'center', color: '#00008b'}}>Список дел пуст</h1>
      }
      
      <div className='pagination'>тут будет пагинация</div>
    </div>
  );
};

export default App;
