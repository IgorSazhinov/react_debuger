import React from "react";
import BtnSet from "./BtnSet";
import MyDate from "./UI/date/MyDate";



const Todo = ({todo, remove, edit}) => {

    return (
        <div className='todo'>
            <div style={{display: 'flex'}}>
                <input style={{margin: '5px'}} type='checkbox'></input>
                <MyDate value={todo.date} readOnly></MyDate>
            </div>
            <div style={{overflow: 'auto'}} className='todo__text'>{todo.text}</div>
            <BtnSet todo={todo} remove={remove} edit={edit}/>
        </div>
    );
};

export default Todo;