import React from "react";
import Todo from "./Todo";
import MyTitle from "./UI/title/MyTitle";

const TodoList = ({todos, remove, edit, setTodos}) => {
    return (
        <div className='todoList'>
            <MyTitle>Список дел:</MyTitle>
            {todos.map(todo => 
                <Todo remove={remove} edit={edit} todo={todo} key={todo.id} setTodos={setTodos}></Todo>
            )}
        </div>
    );
};

export default TodoList;