import React from "react";
import classes from './MyTitle.module.css';

const MyTitle = ({children, ...props}) => {
    return (
        <h1 {...props} className={classes.myTitle}>
            {children}
        </h1>
    );
};

export default MyTitle;