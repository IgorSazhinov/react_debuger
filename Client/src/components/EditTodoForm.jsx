import React from "react";
import { useState } from "react";
import MyButton from "./UI/button/Mybutton";
import MyDate from "./UI/date/MyDate";
import MyInput from "./UI/Input/MyInput";

const EditTodoForm = ({oldTodo, setOldTodo, saveEditedTodo, setVisible}) => {
    
    const [description, setDescription] = useState('Описание задачи')


    // сохраняю отредактированную задачу
    const saveOldTodo = (e) => {
        e.preventDefault()
        if (oldTodo.text != '') {
            saveEditedTodo(oldTodo)
        } else {
            setDescription('Поле дело обязательно для заполнения')
        }
    }

    // Не сохранять запись
    const closeOldTodo = (e) => {
        e.preventDefault()
        setVisible(false)
    }
    

    return (
        <form className="todoForm">
            <MyDate  value={oldTodo.date} onChange={e => setOldTodo({...oldTodo, date: e.target.value})}/>
            <MyInput value={oldTodo.text} onChange={e => setOldTodo({...oldTodo, text: e.target.value})}>{description}</MyInput>
            <MyButton onClick={saveOldTodo}>Сохранить</MyButton>
            <MyButton onClick={closeOldTodo}>Закрыть</MyButton>
        </form>
    );
};

export default EditTodoForm;