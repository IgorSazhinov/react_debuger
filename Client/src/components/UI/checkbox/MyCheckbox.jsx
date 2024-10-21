import React from "react";
import classes from './MyCheckbox.module.css';

const MyCheckbox = (props) => {

    return (
        <input {...props} type="checkbox" className={classes.myCheckbox}/>
    );
};

export default MyCheckbox;