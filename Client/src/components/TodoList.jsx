import React from "react";
import Todo from "./Todo";
import MyTitle from "./UI/title/MyTitle";

const TodoList = ({sortedAndSearchedTodo, remove, edit, setTodos, editComlitedTodo, connectionCompleted}) => {
    
    // проверка на подключение к серверу
    if (!connectionCompleted) {
        return <MyTitle>Идет загрузка с сервера...</MyTitle>
    }

    // проверка на пустой отсортированный массив дел
    if (!sortedAndSearchedTodo.length) {
        return <MyTitle>Список дел пуст</MyTitle>
    }

    return (
        <div className='todoList'>
            <MyTitle>Список дел:</MyTitle>
            {sortedAndSearchedTodo.map(todo => 
                <Todo 
                    remove={remove} 
                    edit={edit} 
                    todo={todo} 
                    key={todo.id} 
                    setTodos={setTodos} 
                    editComlitedTodo={editComlitedTodo} 
                />
            )}
        </div>
    );
};

export default TodoList;