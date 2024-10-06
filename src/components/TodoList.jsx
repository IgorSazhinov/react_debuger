import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, remove, children, edit}) => {
    return (
        <div className='todoList'>
            <h1 style={{textAlign: 'center', color: '#00008b'}}>{children}</h1>
            {todos.map(todo => 
                <Todo remove={remove} edit={edit} todo={todo} key={todo.id}></Todo>
            )}
        </div>
    );
};

export default TodoList;