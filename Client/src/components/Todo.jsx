import React from "react";
import { useState } from "react";
import useDateNow from "../hooks/useDateNow";
import BtnSet from "./BtnSet";
import MyBody from "./UI/body/MyBody";
import MyCheckbox from "./UI/checkbox/MyCheckbox";


const Todo = ({todo, remove, edit, editComlitedTodo}) => {
    const [checkIn, setCheckIn] = useState(todo.completed)

    const soldCheckbox = ({target: {checked}}) => {
        setCheckIn(checked)
        editComlitedTodo(todo, checkIn)
    }


    let date = todo.date.split('-').reverse().join('.')
    const dateNow = useDateNow()
    if (dateNow === todo.date) {
        date = 'Сегодня'
    }

    return (
        <div className='todo'>
            <div style={{display: 'flex', margin: '5px', minWidth: '100px', justifyContent: 'space-between'}}>
                <MyCheckbox onChange={soldCheckbox} checked={checkIn}></MyCheckbox>
                <MyBody>{date}</MyBody>
            </div>
            <MyBody checkIn={checkIn}>{todo.text}</MyBody>
            <BtnSet todo={todo} remove={remove} edit={edit}/>
        </div>
    );
};

export default Todo;