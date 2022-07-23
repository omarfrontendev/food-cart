import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props,ref) => {
    return (
        <div className={classes.control}>
            <label className={classes.label} htmlFor={props.input.id}>{props.label}</label>
            <input onChange={props.onChange} onBlur={props.onBlur}  ref={ref} className={`${classes.input} ${props.class}`} {...props.input}/>
        </div>
    );
});

export default Input;