import React from "react";
import classes from './MyBody.module.css';

const MyBody = ({children, checkIn, ...props}) => {

    const rootClasses = [classes.myBody]
    
    if (checkIn) {
        rootClasses.push(classes.completed)
    }

    return (
        <div {...props} className={rootClasses.join(' ')}>
            <p>{children}</p>
        </div>
    );
};

export default MyBody;