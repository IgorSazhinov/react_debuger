import React from "react";
import useDateNow from "../../../hooks/useDateNow";
import classes from './MyDate.module.css';

const MyDate = (props) => {
    const dateNow = useDateNow()
    return (
        <div className={classes.myDate}>
            {dateNow === props.defaultValue
                ? <p>Сегодня</p>
                : <input  {...props} type='date'></input>
            }
        </div>
    );
};

export default MyDate;