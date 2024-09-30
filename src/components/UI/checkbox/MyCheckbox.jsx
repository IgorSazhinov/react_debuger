import React from "react";
import classes from './MyCheckbox.module.css';

const MyCheckbox = () => {
    return (
        <input id="html" type="checkbox" className={classes.myCheckbox}/>
    );
};

export default MyCheckbox;