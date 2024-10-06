import React from "react";
import { useState } from "react";
import useDateNow from "../hooks/useDateNow";
import MyButton from "./UI/button/Mybutton";
import MyDate from "./UI/date/MyDate";
import MyInput from "./UI/Input/MyInput";

const TodoForm = ({create}) => {

    const [todo, setTodo] = useState({text: '', date: useDateNow()})
    const [description, setDescription] = useState('Описание задачи')

    // создаю новую задачу
    const addNewTodo = (e) => {
    e.preventDefault()
    if (todo.text != '') {
        const newTodo = {
            ...todo, id: Date.now(), completed: false
        }
        create(newTodo)
        setTodo({text: '', date: useDateNow()})
        setDescription('Описание задачи')
    } else {
        setDescription('Поле дело обязательно для заполнения')
    }}

    return (
        <form className="todoForm">
            <MyDate  value={todo.date} onChange={e => setTodo({...todo, date: e.target.value})}/>
            <MyInput value={todo.text} onChange={e => setTodo({...todo, text: e.target.value})}>{description}</MyInput>
            <MyButton onClick={addNewTodo}>Добавить</MyButton>
        </form>
    );
};

export default TodoForm;