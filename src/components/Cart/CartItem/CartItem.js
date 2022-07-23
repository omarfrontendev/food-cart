import classes from './CartItem.module.css'

const CartItem = props => {

    const getItemHandler = () => {
        props.onAdd(props);
    }

    const getIdRemoveHandler = () => {
        props.onRemove(props.id);
    }

    return(
        <li className={classes.item}>
            <div>
            <span className={classes.name}>{props.name}</span>
            <div>
            <span className={classes.price}>${props.price}</span>
            <span className={classes.amount}>x {props.amount}</span>
            </div>
            </div>
            <div className={classes.control}>
                <button onClick={getIdRemoveHandler} className={classes.btns}>--</button>
                <button onClick={getItemHandler} className={classes.btns}>+</button>
            </div>
        </li>
    )

}

export default CartItem;