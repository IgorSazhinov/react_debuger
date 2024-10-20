import React from "react";
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";

const TodoFilter = ({filter, setFilter}) => {
    return (
        <div style={{display: 'flex', marginTop: '5px'}}>
            <MyInput value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}>Найти дело</MyInput> 
            <MySelect
                defaultValue='Сортировка по'
                options={[
                    {value: 'date', name: 'Дате'},
                    {value: 'text', name: 'Названию'},
                    {value: 'today', name: 'Только за сегодня'},
                    {value: 'completed', name: 'Невыполненные'}
                ]}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            />
        </div>
    )
}

export default TodoFilter