import React from "react";
import { useState } from "react";
import BtnSet from "./BtnSet";
import MyBody from "./UI/body/MyBody";
import MyCheckbox from "./UI/checkbox/MyCheckbox";
import MyDate from "./UI/date/MyDate";

const Todo = ({todo, remove, edit, editComlitedTodo}) => {
    const [checkIn, setCheckIn] = useState(todo.completed)


    const soldCheckbox = ({target: {checked}}) => {
        setCheckIn(checked)
        editComlitedTodo(todo, checkIn)
    }

    return (
        <div className='todo'>
            <div style={{display: 'flex'}}>
                <MyCheckbox onChange={soldCheckbox} checked={checkIn}></MyCheckbox>
                <MyDate value={todo.date} readOnly></MyDate>
            </div>
            <MyBody checkIn={checkIn}>{todo.text}</MyBody>
            <BtnSet todo={todo} remove={remove} edit={edit}/>
        </div>
    );
};

export default Todo;