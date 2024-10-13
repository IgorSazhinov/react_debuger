import React from "react";
import classes from './MyCheckbox.module.css';

const MyCheckbox = ({chackIn, setCheckIn, ...props}) => {

    return (
        <input {...props} id="html" type="checkbox" className={classes.myCheckbox}/>
    );
};

export default MyCheckbox;