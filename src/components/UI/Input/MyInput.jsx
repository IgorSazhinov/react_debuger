
import classes from './MyInput.module.css';

const MyInput = ({children, value, ...props}) => {
    return (
        <input {...props} className={classes.myInput} placeholder={children} value={value}></input>
    );
};

export default MyInput;