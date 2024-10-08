import React from "react";
import { useState } from "react";
import BtnSet from "./BtnSet";
import MyCheckbox from "./UI/checkbox/MyCheckbox";
import MyDate from "./UI/date/MyDate";

const Todo = ({todo, remove, edit, setTodos}) => {
    const [checkIn, setCheckIn] = useState(todo.completed)


    const soldCheckbox = ({target: {checked}}) => {
        setCheckIn(checked)
        console.log(checkIn);
    }
    

    return (
        <div className='todo'>
            <div style={{display: 'flex'}}>
                <MyCheckbox onChange={soldCheckbox} checked={checkIn}></MyCheckbox>
                <MyDate value={todo.date} readOnly></MyDate>
            </div>
            <div style={{overflow: 'auto'}} className='todo__text'>{todo.text}</div>
            <BtnSet todo={todo} remove={remove} edit={edit}/>
        </div>
    );
};

export default Todo;