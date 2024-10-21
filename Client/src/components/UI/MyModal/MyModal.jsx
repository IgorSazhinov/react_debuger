import React from "react";
import classes from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    // убираю отрисовку компонента модалки
    if (!visible) {
        return <></>
    }

    const rootClasses = [classes.myModal]
    
    // добавляю класс active для отрисовки стилей модалки
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')}  onClick={() => setVisible(false)} >
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;