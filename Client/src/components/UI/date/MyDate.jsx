import React from "react";
import classes from './MyDate.module.css';

const MyDate = (props) => {
    return (
        <div className={classes.myDate}>
            <input  {...props} type='date'></input>
        </div>
    );
};

export default MyDate;