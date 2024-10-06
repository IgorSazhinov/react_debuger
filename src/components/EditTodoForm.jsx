import React from "react";
import { useState } from "react";
import useDateNow from "../hooks/useDateNow";
import MyButton from "./UI/button/Mybutton";
import MyDate from "./UI/date/MyDate";
import MyInput from "./UI/Input/MyInput";

const EditTodoForm = ({children, oldTodo, setOldTodo, ...props}) => {
    
    const [description, setDescription] = useState('Описание задачи')

    // сохраняю старую задачу
    const saveOldTodo = (e) => {
        e.preventDefault()
        if (oldTodo.text != '') {
            const id = oldTodo.id
            console.log(id);
            const newTodo = {
                ...oldTodo, id: id, completed: false
            }
            props.save(newTodo)
        } else {
            setDescription('Поле дело обязательно для заполнения')
        }}

    return (
        <form className="todoForm">
            <MyDate  value={oldTodo.date} onChange={e => setOldTodo({...oldTodo, date: e.target.value})}/>
            <MyInput value={oldTodo.text} onChange={e => setOldTodo({...oldTodo, text: e.target.value})}>{description}</MyInput>
            <MyButton onClick={saveOldTodo}>{children}</MyButton>
        </form>
    );
};

export default EditTodoForm;