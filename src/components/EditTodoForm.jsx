import React from "react";
import { useState } from "react";
import MyButton from "./UI/button/Mybutton";
import MyDate from "./UI/date/MyDate";
import MyInput from "./UI/Input/MyInput";

const EditTodoForm = ({children, oldTodo, setOldTodo, saveEditedTodo, ...props}) => {
    
    const [description, setDescription] = useState('Описание задачи')
    const [editedTodo, setEditedTodo] = useState({})

    // сохраняю старую задачу
    const saveOldTodo = (e) => {
        e.preventDefault()
        if (oldTodo.text != '') {
            const id = oldTodo.id
            const newTodo = {
                ...oldTodo, id: id, completed: false
            }
            saveEditedTodo(newTodo)
        } else {
            setDescription('Поле дело обязательно для заполнения')
        }}

    return (
        <form className="todoForm">
            <MyDate  value={oldTodo.date} onChange={e => setOldTodo({...oldTodo, date: e.target.value})}/>
            <MyInput value={oldTodo.text} onChange={e => setOldTodo({...oldTodo, text: e.target.value})}>{description}</MyInput>
            <MyButton onClick={saveOldTodo}>{children}</MyButton>
            <MyButton>Закрыть</MyButton>
        </form>
    );
};

export default EditTodoForm;