import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, remove, children}) => {
    return (
        <div className='todoList'>
            <h1 style={{textAlign: 'center', color: '#00008b'}}>{children}</h1>
            {todos.map(todo => 
                <Todo remove={remove} todo={todo} key={todo.id}></Todo>
            )}
        </div>
    );
};

export default TodoList;