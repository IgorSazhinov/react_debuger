import React from "react";
import useDateNow from "../../../hooks/useDateNow";
import classes from './MyDate.module.css';

const MyDate = (props) => {
    
    const getData = useDateNow()
    console.log(getData, props.defaultValue);
    return (
        <input  {...props} type='date' className={classes.myDate}></input>
    );
};

export default MyDate;