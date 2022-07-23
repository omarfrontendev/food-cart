import classes from './Button.module.css';

const Button = props => {
    return (
        <button onClick={props.onClick} className={`${classes.button} ${props.class}`} {...props.button} >
            {props.text}
        </button>
    )
}
export default Button;