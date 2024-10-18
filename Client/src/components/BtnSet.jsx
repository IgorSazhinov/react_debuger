import React from "react";
import MyButton from "./UI/button/Mybutton";

const BtnSet = ({edit, remove, todo}) => {

    return (
        <div className="btnSet">
            <MyButton onClick={() => edit(todo)}>Редактировать</MyButton>
            <MyButton onClick={() => remove(todo)}>Удалить</MyButton>
        </div>
    );
};

export default BtnSet;