import React from "react";
import MyButton from "./UI/button/Mybutton";

const BtnSet = (props) => {
    
    return (
        <div className="btnSet">
            <MyButton onClick={() => props.edit(props.todo)}>Редактировать</MyButton>
            <MyButton onClick={() => props.remove(props.todo)}>Удалить</MyButton>
        </div>
    );
};

export default BtnSet;