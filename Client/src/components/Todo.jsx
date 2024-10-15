import React from "react";
import { useState } from "react";
import BtnSet from "./BtnSet";
import MyBody from "./UI/body/MyBody";
import MyCheckbox from "./UI/checkbox/MyCheckbox";


const Todo = ({todo, remove, edit, editComlitedTodo}) => {
    const [checkIn, setCheckIn] = useState(todo.completed)

    const soldCheckbox = ({target: {checked}}) => {
        setCheckIn(checked)
        editComlitedTodo(todo, checkIn)
    }

    const date = todo.date.split('-').reverse().join('.')

    return (
        <div className='todo'>
            <div style={{display: 'flex'}}>
                <MyCheckbox onChange={soldCheckbox} checked={checkIn}></MyCheckbox>
                <MyBody>{date}</MyBody>
            </div>
            <MyBody checkIn={checkIn}>{todo.text}</MyBody>
            <BtnSet todo={todo} remove={remove} edit={edit}/>
        </div>
    );
};

export default Todo;